import React, {Component} from 'react'
// import a as b from module 相当于给 a 模块起了一个别名 b,
// 这样在其他地方使用可以直接使用 b 这个变量名
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./Home"
import {view as PlayListPage} from "./playListPage/"
import {ModalPortal} from "./playListPage/"
import {view as SearchPage} from "./searchPage/"
import NotFound from "./NotFound"
import Menu from './Menu'
import MusicController from "./audioController/views/MusicController"
import Footer from './Footer'
import './App.css'


class App extends Component {

    render() {
        return (
            // BrowserRouter 会使用 HTML5 的 history API 渲染单页路由
            <Router>
                <div>
                    <Menu />
                {/*Router 只能有一个子元素*/}
                {/*也可以放一个 Switch 组件*/}
                    <div className="content-container">
                        <Switch>
                            {/*Route 组件用来匹配 location.path 的值, 并且渲染相应的组件 */}
                            {/*exact 表示路径完全匹配时才算匹配*/}
                            {/*比如 /todo/1 与 /todo 并不是完全匹配, 与 /todo/:id 完全匹配*/}
                            <Route exact path="/" component={Home} />
                            <Route exact path="/playlist" component={PlayListPage} />
                            <Route exact path="/search" component={SearchPage} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                    <Footer />
                    <MusicController />
                    <ModalPortal />
                </div>
            </Router>
        )
    }
}

export default App
