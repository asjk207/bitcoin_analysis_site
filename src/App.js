import { render } from '@testing-library/react';
import React, { Component } from 'react';
import './App.css';
import Chart from './Components/Chart';
import RealTimePrice from './Components/real_time_price';
import axios from "axios";
import { HashRouter, Route } from "react-router-dom";


class App extends Component {
//     state = {
//         isLoading: true,
//         bn_price_data: []
//      };
//     //binance_bitcoin_data 서버에서 불러오기.
//     getPriceData = async () => {
//           //ES6에서 JSON 파싱시 아래와 같이 좀더 깔끔한 표현이 가능하다.
//         var bn_price_data = await axios.get (
//           "http://localhost:3001/ch_bn_price"
//         );
//         // console.log(bn_price_data);
//         // axios로 부터 get이 완료되면, isLoading상태를 false로 변경하고, movies객체를 세팅한다.
//         this.setState({ bn_price_data, isLoading: false });
//     };

//     componentDidMount() {
//       this.getPriceData();
//     }

    render() {
      //render함수에서 필요한 isLoading, movies 객체를 state로 부터 받아온다.
//        const { isLoading, bn_price_data} = this.state;
//       console.log(bn_price_data);
      return (
        <a>
          <h1>BinanceChart(BTC)</h1>
            <Chart></Chart>
            <RealTimePrice></RealTimePrice>
        </a>
      );
    }

}

export default App;
