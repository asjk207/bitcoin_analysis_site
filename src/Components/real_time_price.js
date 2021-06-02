import React, { useEffect, useState, useRef } from 'react'
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3001/", {transport : ['websocket', 'polling', 'flashsocket']});
// const socket2 = io("http://localhost:3001/", {transport : ['websocket', 'polling', 'flashsocket']});

function RealTimePrice () {
    const [bn_pr_state_data, set_bn_pr_state_data] = useState({
        bn_price_data:0,
        bn_price_dollar_won:0,
        bn_is_Loading:true,
    });
    const [ub_pr_state_data, set_ub_pr_state_data] = useState({
        ub_price_data:0,
        ub_is_Loading:true,
    });
    const [price_difference, set_price_difference] = useState();

    const dollar_exchange = useRef();
    // const [dollar_exchange, set_dollar_exchange] = useState({
    //     dollar_exchange:0,
    // });

    //달러, 원 환율 데이터 가져오기(API)
    useEffect(() => {
        const get_dollar_exchange_data = async () => {
            try {
            const t_dollar_exchange = await axios.get ("https://earthquake.kr:23490/query/USDKRW");
            
            console.log(t_dollar_exchange.data.USDKRW[0]);
            // useState 활용(새로고침시 데이터가 사라져 주석)
            // set_dollar_exchange({
            //     dollar_exchange:t_dollar_exchange.data.USDKRW[0]
            // });
            //useRef 활용하여 가격데이터를 저장하였지만, 마찬가지로 새로고침시 데이터 사라짐.
            dollar_exchange.current=t_dollar_exchange.data.USDKRW[0];
            // latest_isLoading.current=true;
    
            
            // console.log(rs_bn_price_data);
            } catch(err){
              console.log(err);
            }
          }
          get_dollar_exchange_data();
    },[]);

    //바이낸스, 업비트 실시간 가격데이터 가져오기.
    useEffect(() => {
        var t_bn_price_data;
        var t_ub_price_data;
        var bn_price_dollar_won;

        socket.on('bn_price', (bn_price) => {
            // console.log(bn_price);
            bn_price_dollar_won=(Number(bn_price)*(dollar_exchange.current)).toFixed(0);
            // console.log(bn_price_dollar_won);
            t_bn_price_data=bn_price;
            set_bn_pr_state_data({
                bn_price_data:bn_price,
                bn_price_dollar_won:bn_price_dollar_won,
                bn_is_Loading:false
            });
            // console.log("socket_on");
            // console.log(bn_pr_state_data.bn_price_dollar_won);
        });
        socket.on('ub_price', (ub_price) => {
            t_ub_price_data=ub_price
            // console.log(ub_price);
            set_ub_pr_state_data({
                ub_price_data:ub_price,
                ub_is_Loading:false
            });
            console.log("socket2_on");
            set_price_difference(t_ub_price_data-bn_price_dollar_won);
        });
        setInterval(() =>{
            socket.emit("bn_price",102);
            socket.emit("ub_price",105);
        }, 2000);
    },[]);



    return (
        <section className="container">
        {bn_pr_state_data.bn_is_Loading&&ub_pr_state_data.ub_is_Loading ? (
            <div className="RealTimePrice">
              <span className="loader__text">Loading...</span>
            </div>
          ) :(
            <div className="RealTimePrice">
            <h2>Socekt.io Test</h2>
            <a>Binance(BTC-USDT) : {bn_pr_state_data.bn_price_dollar_won}            </a>
            <a>Upbit(BTC-KRW) : {ub_pr_state_data.ub_price_data}        </a>
            <a>Difference : {price_difference}</a>
            </div>
          )}
        </section>
    );
}

export default RealTimePrice;