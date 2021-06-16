import React, { useEffect, useState, useRef } from 'react'
import io from "socket.io-client";
import axios from "axios";
import "./real_time_price.css"

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
    // 가격 차이 구하는 변수
    const [price_difference, set_price_difference] = useState();
    // 가격 차이를 이용한 %값을 구하는 변수
    const [price_diff_percent, set_price_diff_percent] = useState();

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
            // 바이낸스 업비트 실시간 가격 차이 계산
            set_price_difference(t_ub_price_data-bn_price_dollar_won);
            // 바이낸스 업비트 실시간 가격차이 퍼센트단위로 계산
            set_price_diff_percent((((t_ub_price_data-bn_price_dollar_won)/t_ub_price_data)*100).toFixed(2));
        });
        setInterval(() =>{
            socket.emit("bn_price",102);
            socket.emit("ub_price",105);
        }, 2000);
    },[]);



    return (
        <section className="rt_container">
        {bn_pr_state_data.bn_is_Loading&&ub_pr_state_data.ub_is_Loading ? (
            <div className="RealTimePrice">
              <span className="loader__text">Loading...</span>
            </div>
          ) :(
            <div className="RealTimePrice">
                <h3>RealTimePrice</h3>
                <table className="RealTimePrice__Table">
                    <thead>
                        <tr>
                            <th>코인 이름</th>
                            <th>바이낸스 가격</th>
                            <th>업비트 가격</th>
                            <th>가격차이</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>비트코인(BTC)</td>
                            <td>{bn_pr_state_data.bn_price_dollar_won}</td>
                            <td>{ub_pr_state_data.ub_price_data}</td>
                            <td>
                                {price_difference}
                                <div>
                                    ({price_diff_percent}%)
                                </div>
                            </td>                          
                        </tr>

                    </tbody>               
                </table>
            </div>
          )}
        </section>
    );
}

export default RealTimePrice;