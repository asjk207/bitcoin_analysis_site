import React, { useEffect, useRef, Component, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
//import { priceData } from './priceData';
// import { areaData } from './areaData';
import { volumeData } from './volumeData.js';
import PropTypes from "prop-types";
import axios from "axios";

import './Chart.css';
import { priceData } from './priceData.js';

//binance data 자료형
    // time: Number,
    // open: String,
    // high: String,
    // low: String,
    // close: String,
    // volume: String,
    // closeTime: Number,
    // assetVolume: String,
    // trades: Number,
    // buyBaseVolume: String,
    // buyAssetVolume: String,
    // ignored: String,
    // date: { type: Date, default: Date.now }

// function Chart({ id, time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored, date }) {
function Chart () {

  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  //bn_price_data용 state
  //가격데이터, 로딩 상태 변수 저장.
  // const [bn_price_data, set_bn_price_data] = useState({
  //   price_data:[],
  //   isLoading: false
  // });
  const latest_bn_price_data = useRef();
  const latest_isLoading = useRef();

  useEffect(() => {
      // const t_data ={price_data:this.bn_price_data[price_data], isloading:bn_price_data[isLoading]};
      // REST API를 이용하여 Node.JS 서버로 부터 DB 에 저장된 데이터 수신
      const get_bn_price_data = async () => {
        try {
        const rs_bn_price_data = await axios.get ("http://localhost:3001/ch_bn_price");
        // set_bn_price_data({
        //   price_data:rs_bn_price_data, 
        //   isLoading:true
        // });
        //새로고침시 받아온 가격데이터가 초기화 되므로 브라우져 로컬저장소에 데이터 저장.
        window.localStorage.setItem("lo_bn_price_data", JSON.stringify(rs_bn_price_data));
        window.localStorage.setItem("lo_isLoading", JSON.stringify(true));

        latest_bn_price_data.current=rs_bn_price_data;
        latest_isLoading.current=true;

        console.log("after await   ");
        // console.log(rs_bn_price_data);
        } catch(err){
          console.log(err);
        }
      }
      get_bn_price_data();
      // console.log("before bn_price_data   ");
      // console.log(latest_bn_price_data.current);
   

    // if(bn_price_data.isLoading===true) {
    //   // var bn_price = bn_price_data.data.map(data =>{
    //   //   console.log(data);
    //   //   return data;
    //   // })
    //   // console.log(bn_price_data.data);
    // }

  },[]);

  // useEffect는 render와 dependency와 밀접한 연관이 있다.
  useEffect(() => {

      if(JSON.parse(window.localStorage.getItem("lo_isLoading"))===true) {

        chart.current = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
          layout: {
            backgroundColor: '#253248',
            textColor: 'rgba(255, 255, 255, 0.9)',
          },
          grid: {
            vertLines: {
              color: '#334158',
            },
            horzLines: {
              color: '#334158',
            },
          },
          crosshair: {
            mode: CrosshairMode.Normal,
          },
          priceScale: {
            borderColor: '#485c7b',
          },
          timeScale: {
            borderColor: '#485c7b',
          },
        });

      // console.log(chart.current);

        const candleSeries = chart.current.addCandlestickSeries({
          upColor: '#4bffb5',
          downColor: '#ff4976',
          borderDownColor: '#ff4976',
          borderUpColor: '#4bffb5',
          wickDownColor: '#838ca1',
          wickUpColor: '#838ca1',
        });
        const t_bn_price_data=JSON.parse(window.localStorage.getItem("lo_bn_price_data"));
        // const t_date=new Date(t_bn_price_data.data[3].time);
        // const f_date=t_date.getFullYear()+'-'+(t_date.getMonth()+1)+'-'+t_date.getDay();
        // console.log(f_date);
        
        console.log(Array.isArray(priceData));
        console.log(Array.isArray(t_bn_price_data.data));

        // Array.from(t_bn_price_data.data).forEach(function(el) { console.log(el) });
        // 로컬 저장소에 저장된 binance가격 데이터 배열 챠트 라이브러리 형식에 맞게 파싱
        const tt_bn_price_data = t_bn_price_data.data.map((d) => {
            const st_date=new Date(d.time);
            const st_year = st_date.getFullYear();
            const st_month = ("0" + (st_date.getMonth() + 1)).slice(-2);
            const st_day = ("0" + st_date.getDate()).slice(-2);
            //const f_date = { year: t_year, month: t_month, day: t_day};
            const sf_date=`${st_year}-${st_month}-${st_day}`;

            // const ct_date=new Date(d.closeTime);
            // const ct_year = ct_date.getFullYear();
            // const ct_month = ct_date.getMonth();
            // const ct_day = ct_date.getDay();
            // const cf_date=`${ct_year}-${ct_month < 10 ? `0${ct_month}` : ct_month}-${ct_day < 10 ? `0${ct_day}` : ct_day}`;
            // const f_date=t_date.getFullYear()+'-'+(t_date.getMonth()+1)+'-'+t_date.getDay();
            // console.log(f_date, Number(d.open), Number(d.high), Number(d.low), Number(d.close));
            // if(f_date === null || Number(d.open) === null || Number(d.high) === null || Number(d.low) === null || Number(d.close) === null) {
            //   console.log("NULL!!!");
            // }

            return {
              time: sf_date,
              // ctime: cf_date,
              open:Number(d.open), 
              high:Number(d.high), 
              low:Number(d.low), 
              close:Number(d.close)
              // open:1.3, 
              // high:5.8, 
              // low:1.1, 
              // close:5.7
            };
        });

        
        //챠트 라이브러리 uncaght value: null에러로 데이터 오름차순 정렬
        function date_ascending(a, b) {
          var dateA = new Date(a['time']).getTime();
          var dateB = new Date(b['time']).getTime();
          return dateA > dateB ? 1 : -1;
        };

        tt_bn_price_data.sort(date_ascending);

        
        // data.sort(date_ascending);
        //console.log(data.sort(date_descending)) // 내림차순
            
        // function date_descending(a, b) {
        //   var dateA = new Date(a['time']).getTime();
        //   var dateB = new Date(b['time']).getTime();
        //   return dateA < dateB ? 1 : -1;
        // };
            
        console.log(tt_bn_price_data);    
        candleSeries.setData(tt_bn_price_data);
        // const areaSeries = chart.current.addAreaSeries({
        //   topColor: 'rgba(38,198,218, 0.56)',
        //   bottomColor: 'rgba(38,198,218, 0.04)',
        //   lineColor: 'rgba(38,198,218, 1)',
        //   lineWidth: 2
        // });

        // areaSeries.setData(areaData);

        const volumeSeries = chart.current.addHistogramSeries({
          color: '#182233',
          lineWidth: 2,
          priceFormat: {
            type: 'volume',
          },
          overlay: true,
          scaleMargins: {
            top: 0.8,
            bottom: 0,
          },
        });

        //volumeSeries.setData(volumeData);
        console.log("CreateChart");
    }
  }, []);

  // [] 배열의 의미는 최초일때만 이함수가 실행 되게 한다. ComponentDidMount와 비슷한 의미이다.

  // Resize chart on container resizes.
  useEffect(() => {
    if(JSON.parse(window.localStorage.getItem("lo_isLoading"))===true) {

        resizeObserver.current = new ResizeObserver(entries => {
          const { width, height } = entries[0].contentRect;
          chart.current.applyOptions({ width, height });
          setTimeout(() => {
            chart.current.timeScale().fitContent();
          }, 0);
        });

        resizeObserver.current.observe(chartContainerRef.current);
        console.log("Chart Resize");

        //이 부분은 다음 디펜던시에 의해서 실행될때 리턴에 연관된 함수가 실행된다.
        // ComponentWillUnmount의 역할
        return () => resizeObserver.current.disconnect();
      }

    }, []);

    return (
      <div className="Chart">
        <div ref={chartContainerRef} className="chart-container" />
      </div>
    );
}
   


  
// 위와 같이 Movie라는 component를 생성하면 사용할 수 있습니다. props는 아래 propsTypes를 통해서 정의할 수 있습니다.
// Chart.propTypes = {
//     time: PropTypes.number.isRequired,
//     open: PropTypes.string.isRequired,
//     high: PropTypes.string.isRequired,
//     low: PropTypes.string.isRequired,
//     close: PropTypes.string.isRequired,
//     volume: PropTypes.string.isRequired,
//     closeTime: PropTypes.number.isRequired,
//     assetVolume: PropTypes.string.isRequired,
//     trades: PropTypes.number.isRequired,
//     buyBaseVolume: PropTypes.string.isRequired,
//     buyAssetVolume: PropTypes.string.isRequired,
//     ignored: PropTypes.string.isRequired
//   };

export default Chart;
