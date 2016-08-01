import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadIssues} from '../actions/index'
import {logger} from '../utils/logger';

class App extends Component {
    handleClick() {
        this.props.loadIssues();
    }

    render() {
        logger.debug("this.props in App render: " + JSON.stringify(this.props));
        return (
            <div>
                <h1>Hello world! {this.props.counter}</h1>
                <button onClick={this.handleClick.bind(this)}>Load issues</button>
                <ul>
                    {this.props.issues.map(
                        (issue) => <li>{issue.title}</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {counter: state.counter, issues: state.issues};
    },
    (dispatch) => {
        return bindActionCreators({loadIssues}, dispatch);
    }
)(App);