import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

class Menu extends Component {
    constructor(props) {
        super(props)

        this.onClick = this.onClick.bind(this)
    }

    onClick() {

    }

    render() {
        let searchContent = this.props.searchContent
        let searchPath = `?s=${searchContent}`
        if (searchContent === '' || searchContent === undefined) {
            searchPath = ''
        }
        let menus = [
            {
                text: '首页',
                pathname: '/',
                search: '',
            },
            {
                text: '热门歌单',
                pathname: `/playlist`,
                search: `?cat=${this.props.activeTag}`,
            },
            {
                text: '搜索',
                pathname: `/search`,
                search: searchPath,
            },
        ]
        return (
            <nav>
                <ul className="nav-container">
                    {
                        menus.map((e, index) => {
                                let href = `${e.pathname}${e.search}`
                                let isCurrent = this.props.currentPathname === e.pathname
                                // Link 组件相当于 a 标签的作用, to 相当于 href 属性
                                return (
                                    <li className="nav-item" key={index}>
                                        <Link className={isCurrent? "nav-link nav-link-current" : "nav-link"} to={href}>{e.text}</Link>
                                    </li>
                                )
                            }
                        )
                    }
                </ul>
            </nav>
        )
    }
}

const mapStateTopProps = (state, ownProps) => {
    return {
        activeTag: state.PlayListReducer.activeTag,
        searchContent: state.SearchBarReducer.searchContent,
        currentPathname: ownProps.location.pathname,
    }
}

export default withRouter(connect(mapStateTopProps, null)(Menu))
