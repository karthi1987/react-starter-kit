//lib and utils
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
//Store
import { AppStore } from './app-store';
//utils
import { connectAndMap } from 'utils/utils';
import 'utils/mock-feeds.js';
//action-creators
import { getAppData, getViewportSize } from './app-actions-reducers';
//Global Components
import Header from './header/header';
import Nav from './nav/nav';
import Footer from './footer/footer';

class AppProvider extends React.Component{
    render () {
        return (
            <Provider store={ AppStore }>
                <App />
            </Provider>
        )
    }
}

let App = connectAndMap(
    [ 'app' ],
    {
        getAppData,
        getViewportSize,
    }
)(
    class extends React.Component{
        componentWillMount(){
            this.props.getViewportSize();
            this.props.getAppData();
        }

        render(){
            return(
                <div>
                  <Header />

                  <Nav />
                    
                  <Footer />
                </div>
            )
        }
    }
);

let appRoot = document.getElementById( 'app-root' );
render(
    <AppProvider />,
    appRoot
);
