import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
//import { priceData } from './priceData';
// import { areaData } from './areaData';
import { volumeData } from './volumeData.js';
import PropTypes from "prop-types";
import axios from "axios";

import './Chart.css';

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

function Chart({ id, time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored, date }) {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  useEffect(() => {
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

    console.log(chart.current);

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
    });

    // async () => {
    //   axios
    //     .get("http://localhost:3001/ch_bn_price")
    //     .then(({ data } ) => {
    //       console.log(data);
    //     })
    //     .catch(e => {
    //       console.error(e);
    //     });
    // };
   
    candleSeries.setData({open, high, low, close});
      
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

    volumeSeries.setData(volumeData);
  }, []);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  return (
    <div className="Chart">
      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
}

// 위와 같이 Movie라는 component를 생성하면 사용할 수 있습니다. props는 아래 propsTypes를 통해서 정의할 수 있습니다.
Chart.propTypes = {
    time: PropTypes.number.isRequired,
    open: PropTypes.string.isRequired,
    high: PropTypes.string.isRequired,
    low: PropTypes.string.isRequired,
    close: PropTypes.string.isRequired,
    volume: PropTypes.string.isRequired,
    closeTime: PropTypes.number.isRequired,
    assetVolume: PropTypes.string.isRequired,
    trades: PropTypes.number.isRequired,
    buyBaseVolume: PropTypes.string.isRequired,
    buyAssetVolume: PropTypes.string.isRequired,
    ignored: PropTypes.string.isRequired
  };

export default Chart;
