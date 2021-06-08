import React from "react";
import {TwitterTimelineEmbed, TwitterTweetEmbed} from 'react-twitter-embed';
import Navigation from '../Components/Navigation'
import Home from './Home'

class Twitter_Page extends React.Component {
    render() {
        //render함수에서 필요한 isLoading, movies 객체를 state로 부터 받아온다.
  //        const { isLoading, bn_price_data} = this.state;
  //       console.log(bn_price_data);
        return (
          <a>
             <TwitterTimelineEmbed
                sourceType="profile"
                screenName="ki_young_ju"
                options={{height: 400}}
              />
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="glassnode"
                options={{height: 400}}
              />
              {/* <TwitterTweetEmbed
                tweetId={'1399835668864405507'}
              /> */}
          </a>
        );
      }
}

export default Twitter_Page