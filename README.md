# BitCoin_Analysis_SITE
<!-- ![mainPage](./images/mainPage.PNG) -->

made by 윤재학

contact jhkyoon@naver.com
## 목차
* 들어가며
  1. 프로젝트 소개  
    1-1. 프로젝트 기능   
    1-2. 개발 환경    
    1-3. 프로젝트 작동구조   
    1-4. 실행영상
    
* Front-End(React)
  1. 컴포넌트 구성
  
* Back-End(Node JS) - 별도로 프로젝트를 업로드 하였습니다.
  - <a href="https://github.com/asjk207/bitcoin_analysis_server">BitCoin_Analysis_Server</a>
  
* 마치며
  1. 프로젝트 보완 사항.
  2. 소감
  
## 들어가며
 #### 1. 프로젝트 소개
 
&nbsp;&nbsp;본 프로젝트를 시작하게 된 계기는 https://kimpga.com/ 라는 웹사이트에서 영감을 받아 제작하게 되었습니다.
해당 사이트에서 제공하는 기능을 비슷하게 구현함과 동시에 나아가 비트코인 온체인 데이터를 파싱하여, 그래프 형태로 출력하는
기능을 추가하여, 비트코인 투자에 도움이 되는 정보를 하나의 사이트에서 볼수 있게 하고자 하는 목적으로 제작하게 되었습니다.
     
   #### 1-1. 프로젝트 기능
   
&nbsp;&nbsp;초기에 구상한 기능은 우선, 비트코인 챠트 데이터를 가상자산 거래소 API를 통해 가져와 출력하는 기능과 실시간으로 한국의 가상자산 거래소와 외국 가상자산 거래소의 가격차이를 비교하는 것을 구상하였습니다.
    
  * 구현 기능
    * Node JS로 제작한 서버를 통해 BinanceAPI로 캔들 데이터를 불러와 DB에 저장.
    * React로 제작된 클라이언트 어플리케이션 측에서 Node JS서버에서 데이터를 불러와 챠트 형태로 출력.
    * Node JS서버를 통해 한국 가상자산 거래소(UPBit) API를 이용하여, 실시간 가격 데이터를 가져온다.
    * Node JS서버를 통해 외국 가상자산 거래소(Binance) API를 이용하여, 실시간 가격 데이터를 가져온다.
    * React로 제작된 클라이언트 어플리케이션 측에서 NodeJS로 받은 실시간 가격데이터를 화면에 실시간으로 웹브라우저에 출력.
    * React로 제작된 클라이언트 어플리케이션 측에서 외국 가상자산 거래소와 한국 가상자산 거래소의 가격차이를 웹브라우저에 출력.
    * 비트코인 관련 투자정보를 제공하는 twit을 웹브라우져에 출력한다.
    
  * 구현 예정 기능
    * 비트코인 선물 가격을 웹브라우저에 출력한다. (미구현)<br/>
    * 비트코인 온체인 데이터를 파싱하여, 그래프 형태로 웹브라우져에 출력한다.(미구현)<br/><br/>
    
   #### 1-2. 개발 환경
    
  &nbsp;&nbsp;운영 체제: window10<br/>
  &nbsp;&nbsp;IDE: Visual Studio Code v1.57.0<br/>
  &nbsp;&nbsp;Back-end: NodeJS v14.17.0, NodeJS-express v4.16.4<br/>
  &nbsp;&nbsp;Front-end: React 17.0.2<br/>
  &nbsp;&nbsp;Data Base: MongoDB atlas<br/>
  &nbsp;&nbsp;Module Bundler: <br/>
  &nbsp;&nbsp;Web browser: Chrome<br/>
    
   #### 1-3. 프로젝트 작동구조
    
   &nbsp;&nbsp; 구현된 NodeJS 서버를 통해 가상자산 거래소 API를 이용하여, 비트코인 차트 캔들 데이터, 실시간 데이터를 수집한 후 클라이언트에 전달하는 형태로 구현하였습니다. 
   
   &nbsp;&nbsp; 차트 캔들 데이터의 경우 거래소 API를 통해 500개의 한정된 캔들 데이터 만을 받을수 있었습니다.데이터를 mongoDB atlas를 이용하여, 데이터를 저장한후, 미리 저장된 500개의 캔들 데이터를 REST API형태로 클라이언트에 전달하도록 구현하였습니다. 
   
   &nbsp;&nbsp; 실시간 가격 데이터의 경우 NodeJS서버에서 받은 가상자산거래소 API의 실시간 가격데이터를 지속적으로 클라
   이언트에 전달할 필요성이 있어, WebSocket을 이용하여, 구현후, 웹브라우저에 실시간으로 가격변동여부를 알수 있게 출력
   하였습니다.
   
   <!-- #### 1-4. 실행영상  -->
<!-- **아래의 이미지를 클릭해주세요.** -->

<!-- [![Video Label](http://img.youtube.com/vi/JgWCIUzCKHQ/0.jpg)](https://youtu.be/JgWCIUzCKHQ?t=0s)  -->

## Front-end(React)
 #### 1. 컴포넌트 구성
 
 &nbsp;&nbsp;우선 Front-end의 주요 폴더구조는 아래와 같습니다.
 
 >src<br/>
 >>Components<br/>
 >>>areaData.js<br/>
 >>>Chart.css<br/>
 >>>Chart.js<br/>
 >>>Navigation.css<br/>
 >>>Navigation.js<br/>
 >>>real_time_price.css<br/>
 >>>real_time_price.js<br/>
 >>>volueData.js<br/>
 >>routes<br/>
 >>>Home.css<br/>
 >>>Home.js<br/>
 >>>Twiter_Page.js<br/>
 >>>Twiter_Page.css<br/>
 >>App.css<br/>
 >>App.js<br/>
 >>index.css<br/>
 >>index.js
 

 
 ## 마치며
 #### 1. 프로젝트 보완사항
 
 &nbsp;&nbsp; 본 프로젝트는 사용자 경험(UI/UX)측면에서 부족한 점이 많다고 생각됩니다. CSS와 html에 대한 이해가 아직
 부족하여, 사용자가 좀더 보기 편하고, 사용하기 편리한 웹 어플리케이션으로써는 부족한점이 많다고 생각됩니다.
 (추후, CSS, HTML관련 지식을 보완하여, UI/UX를 보강할 예정입니다.)
 
 
&nbsp;&nbsp; 또한, 해당 프로젝트를 만들기 위하여 참고하였던, https://kimpga.com/ 에서 제공되는 다양한 기능을 아직 대다수 구현하지 못하였습니다. 또한, 비트코인 투자 에서 참고 되는 지표인 비트코인 온체인 데이터에 관한 그래프를 아직 
구현하지 못하였습니다.

#### 2. 소감

&nbsp;&nbsp; 본 프로젝트는 아직 미완성에 가까운 프로젝트 이지만, 웹 개발과 관련한 다양한 지식을 쌓으며, 지속적으로 
프로젝트를 보완해 나갈 생각입니다. 

&nbsp;&nbsp; 이번 프로젝트를 진행하며, 생각만으로 구현하기 쉬울것이라 생각했던 기능들이 막상 구현을 시작하며 발생하는
다양한 버그와 오류들을 겪으며 프로그램 개발의 어려움과 성취감을 동시에 느낄수 있었습니다. 



 
 

 
 
 





    



