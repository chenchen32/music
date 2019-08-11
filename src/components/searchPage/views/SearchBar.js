import React, {Component} from 'react'
import {connect} from 'react-redux'
import  {inputChange} from '../actions'
import {withRouter} from "react-router-dom"
import {argsFromQuery, parseClass} from "../../../utils"

class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.fillSearchContentInSearchBar()

        this.onSearch = this.onSearch.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onKeyPress = this.onKeyPress.bind(this)
    }

    parseUrlGetSearchContent(location) {
        let searchObj = argsFromQuery(location.search)
        let searchContent = decodeURI(searchObj['s'])
        if (searchContent !== undefined) {
            return searchContent
        }
    }

    fillSearchContentInSearchBar() {
        this.value = this.parseUrlGetSearchContent(this.props.location)
        if (this.value === 'undefined') {
            this.value = ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.search !== this.props.location.search) {
            this.value = this.parseUrlGetSearchContent(this.props.location)
        }
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
        }
    }

    getSearchUrl() {
        console.log('this.props.searchInput', this.props.searchInput)
        let name = this.props.searchInput.trim()
        if (name === undefined) {
            name = ''
        }
        let page = 1
        return {
            pathname: '/search',
            search: `?s=${name}&page=${page}`,
        }
    }

    onKeyPress(event) {
        if (event.key === 'Enter') {
            this.onSearch()
        }
    }

    render() {
        let classNameOfBar = parseClass({
            'search-bar-container': true,
            'before-searched': this.props.searchResult === undefined,
        })
        return(
            <div className={classNameOfBar}>
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
        inputChange:  (input) => {
            dispatch(inputChange(input))
        }
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(SearchBar))