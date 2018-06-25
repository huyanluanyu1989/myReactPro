import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import 'antd/dist/antd.css';
import PCIndex from './components/pcIndex';
import MobileIndex from './components/mobileIndex';
import MediaQuery from 'react-responsive';
import PCNewsDetails from './components/pc_news_details';
import MobileNewsDetails from './components/mobile_news_details';

class Root extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <MediaQuery query="(min-device-width: 1224px)">
                        <Route exact path="/" component={PCIndex}></Route>
                        <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
                        {/*<PCIndex/>*/}
                    </MediaQuery>
                </Router>
                <Router>
                    <MediaQuery query='(max-device-width:1224px)'>
                        <Route exact path="/" component={MobileIndex}></Route>
                        <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
                    </MediaQuery>
                </Router>
            </div>

        )
    }
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
