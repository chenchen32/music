import React, {Component} from 'react'

class NotFound extends Component {
    render() {
        return (
            <div className="error-404">
                <img src="https://static.hdslb.com/error/very_sorry.png" alt="not-found"/>
                <div className="error-description">
                    <b>错误号：404</b><br/>
                    <b>请点击上方导航，进行浏览（未配置服务器进行页面重定向）</b>
                </div>
            </div>
        )
    }
}

export default NotFound