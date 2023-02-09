import React, { Component,PureComponent } from 'react';

import TabBaseWebView from "./TabBaseWebView";

function TabBaseWebViewHoc(defaultProps) {
    return class extends Component {
        constructor(props) {
            super(props);
            // this.state = {
            //     data: [],
            // };
        }
        componentWillMount() {
            // fetchData().then((list) => {
            //     this.setState({
            //         data: list,
            //     });
            // }, (error) => {
            //     console.log(error); // eslint-disable-line
            // });
        }
        render() {
            // return <TabBaseWebView data={this.state.data} {...defaultProps} {...this.props} />;
            return <TabBaseWebView  {...defaultProps} />;
        }
    };
}
export default TabBaseWebViewHoc;