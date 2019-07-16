import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

class Menu extends Component {

    render() {
        let {searchContent, searchPage} = {...this.props.searchBar}
        let searchPath = `?s=${searchContent}&page=${searchPage}`
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
                search: `?cat=${this.props.playList.activeTag}&page=${this.props.playList.currentPage}`,
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
        playList: state.PlayListReducer,
        searchBar: state.SearchBarReducer,
        currentPathname: ownProps.location.pathname,
    }
}

export default withRouter(connect(mapStateTopProps, null)(Menu))
