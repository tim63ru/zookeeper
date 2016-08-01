import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {signOut} from '../actions/index'
import {bindActionCreators} from 'redux';

export class App extends Component {

    doSignOut() {
        this.props.actions.signOut();

    }

    render() {
        const {dispatch} = this.props;
        return (
            <div className='container'>
                <div className="header">
                    <button className='btn btn-primary pull-right'
                            type='button' onClick={this.doSignOut.bind(this)}>
                        Выйти
                    </button>
                    <ul className='nav nav-pills pull-right'>
                        <li><Link to='/list'>list</Link></li>
                        <li><Link to='/signin'>signin</Link></li>
                        <li><Link to='/signup'>signup</Link></li>
                    </ul>
                    <h3 className="text-muted">Zoo Keeper</h3>
                </div>
                {this.props.children}
            </div>
        )
    }
}


function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({signOut}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
