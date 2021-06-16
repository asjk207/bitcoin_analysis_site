import React from "react";
import {TwitterTimelineEmbed, TwitterTweetEmbed} from 'react-twitter-embed';
import "./Twitter_Page.css"

class Twitter_Page extends React.Component {
    render() {
        //render함수에서 필요한 isLoading, movies 객체를 state로 부터 받아온다.
  //        const { isLoading, bn_price_data} = this.state;
  //       console.log(bn_price_data);
        return (
          <div className="twitter_page">
            
              <div className="twit__embed">
                <ul className="twit__bitOnChain__Item">
                <h3>비트코인 온체인 데이터 분석가</h3>
                  <li>
                    <TwitterTimelineEmbed
                      sourceType="profile"
                      screenName="ki_young_ju"
                      options={{height: 400}}
                    />
                  </li>
                  <li>
                    <TwitterTimelineEmbed
                      sourceType="profile"
                      screenName="glassnode"
                      options={{height: 400}}
                    />
                  </li>
                </ul>
                <ul className="twit__Wa__Item">
                <h3>고래 알림</h3>
                  <li>
                    <TwitterTimelineEmbed
                      sourceType="profile"
                      screenName="whale_alert"
                      options={{height: 1200}}
                    />
                  </li>
                </ul>


                  {/* <TwitterTweetEmbed
                    tweetId={'1399835668864405507'}
                  /> */}
              </div>
          </div>
        );
      }
}

export default Twitter_Page