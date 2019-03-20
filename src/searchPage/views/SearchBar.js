import React, {Component} from 'react'
import {connect} from 'react-redux'
import  {inputChange, fetchSearchResult} from '../actions'
import {withRouter} from "react-router-dom"

class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.onSearch = this.onSearch.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onKeyPress = this.onKeyPress.bind(this)
    }

    argsFromQuery(query) {
        let o = {}
        if (query.length === 0) {
            return o
        }
        query.split('&').forEach(e => {
            let [k, v] = e.split('=')
            o[k] = v
        })
        return o
    }

    parseUrlGetSearchContent(location) {
        if (location.pathname === "/search") {
            let searchQuery = location.search.slice(1)
            let searchContent = this.argsFromQuery(searchQuery)
            let value = decodeURI(searchContent['s'])
            if (value !== undefined) {
                return value
            }
        }
    }

    componentWillMount() {
        let location = this.props.location
        this.value = this.parseUrlGetSearchContent(location)
        if (this.value === 'undefined') {
            this.value = ''
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.location !== this.props.location) {
            let location = nextProps.location
            this.value = this.parseUrlGetSearchContent(location)
        }
        console.log('组件更新了')
    }

    onChange(event) {
        this.value = event.target.value
        this.props.inputChange(this.value)
    }

    onSearch() {
        let hasInputted = this.props.searchInput === undefined || this.props.searchInput === ''
        if (hasInputted) {
            return 0
        }
        let isEqualToOldSearchContent = this.props.searchContent !== this.props.searchInput
        let isAtSearchPage = window.location.pathname !== '/search'
        if (isEqualToOldSearchContent || isAtSearchPage) {
            let urlObj = this.getSearchUrl()
            this.props.history.push(urlObj)
            // this.props.searchAction(this.props.searchInput)
        }
    }

    getSearchUrl() {
        console.log('this.props.searchInput', this.props.searchInput)
        let name = this.props.searchInput.trim()
        if (name === undefined) {
            name = ''
        }
        let page = 1
        let o = {
            pathname: '/search',
            search: `?s=${name}&page=${page}`,
        }
        return o
    }

    onKeyPress(event) {
        if (event.key === 'Enter') {
            this.onSearch()
        }
    }

    render() {
        return(
            <div className={(this.props.searchResult === undefined) ? "search-bar-container before-searched" : "search-bar-container"}>
                <input type="text" className="search-bar-input" placeholder="搜索音乐、MV、歌单、用户" onChange={this.onChange} onKeyDown={this.onKeyPress} value={this.value || ''}/>
                <button className="search-bar-button" onClick={this.onSearch}>搜索</button>
            </div>
        )
    }
}

const mapStateTopProps = (state) => {
    let theState = state.SearchBarReducer
    return {
        searchInput: theState.searchInput,
        searchContent: theState.searchContent,
        searchResult: theState.searchResult,
        status: theState.status,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchAction: (input, page) => {
            dispatch(fetchSearchResult(input, page))
        },
        inputChange:  (input) => {
            dispatch(inputChange(input))
        }
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(SearchBar))