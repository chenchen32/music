import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {view as Home} from './homePage/'
import {view as PlayListPage} from './playListPage/'
import {view as SearchPage} from './searchPage/'
import NotFound from './NotFound'
import Menu from './Menu'
import {view as MusicController} from './audioController/'
import Footer from './Footer'
import './App.css'

class App extends Component {

    render() {
        return (
            // BrowserRouter 会使用 HTML5 的 history API 渲染单页路由
            <Router>
                <React.Fragment>
                    <Menu />
                    {/*Router 只能有一个子元素 也可以放一个 Switch 组件*/}
                    <div className="content-container">
                        <Switch>
                            {/*Route 组件用来匹配 location.path 的值, 并且渲染相应的组件 */}
                            {/*exact 表示路径完全匹配时才算匹配*/}
                            <Route exact path="/" component={Home} />
                            <Route exact path="/playlist" component={PlayListPage} />
                            <Route exact path="/search" component={SearchPage} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                    <Footer />
                    <MusicController />
                </React.Fragment>
            </Router>
        )
    }
}

export default App
