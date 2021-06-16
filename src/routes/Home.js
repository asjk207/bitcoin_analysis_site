import React from "react";
// import Header from "../Components/Header"
import Chart from "../Components/Chart"
import RealTimePrice from "../Components/real_time_price"
import './Home.css'

class Home extends React.Component {
    render() {
        //render함수에서 필요한 isLoading, movies 객체를 state로 부터 받아온다.
  //        const { isLoading, bn_price_data} = this.state;
  //       console.log(bn_price_data);
        return (
          <>
            <Chart></Chart>
            <RealTimePrice></RealTimePrice>
          </>

        );
      }
}

export default Home