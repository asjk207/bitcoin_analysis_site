import React from "react";
import Chart from "../Components/Chart"
import RealTimePrice from "../Components/real_time_price"

class Home extends React.Component {
    render() {
        //render함수에서 필요한 isLoading, movies 객체를 state로 부터 받아온다.
  //        const { isLoading, bn_price_data} = this.state;
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

export default Home