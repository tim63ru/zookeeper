import React, {Component} from 'react';
import {Link} from 'react-router';

export default class NotFound extends Component {
    render() {
        return (
            <div>
                Такой страницы не существует. <br />
                Вернуться на <Link to='/'>главную</Link>.
            </div>
        )
    }
}
