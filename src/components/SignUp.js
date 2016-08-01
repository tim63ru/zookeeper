import React, {Component} from 'react';
import {logger} from '../utils/logger';
import * as UserActions from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export class SingUp extends Component {
    handleSubmit(e) {
        e.preventDefault();
        logger.debug("login: " + e.target.elements[0].value + ", pass = " + e.target.elements[1].value);
        this.props.actions.signUp({
            login: e.target.elements[0].value,
            password: e.target.elements[1].value
        });
    }

    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col-md-12'>
                        Укажите свои данные для регистрации:
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <form className='form-horizontal' onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="loginInput">Логин</label>
                                <input id="loginInput"
                                       className='form-control' type='text' placeholder='login'/>{' '}
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordInput">Пароль</label>
                                <input id="passwordInput"
                                       className='form-control' type='password' placeholder='********'/>{' '}
                            </div>
                            <button className='btn btn-primary' type='submit'>Зарегистрироваться</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(UserActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingUp);