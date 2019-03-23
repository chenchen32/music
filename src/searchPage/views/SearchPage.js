import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Status from '../status'
import {fetchSearchResult, inputChange} from '../actions'
import SearchBar from './SearchBar'
import SearchList from './SearchList'
import './SearchPage.css'

class SearchPage extends Component {
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

    getSearchContent(location) {
        let searchPath = location.search
        let searchQuery = searchPath.slice(1)
        let searchContent = this.argsFromQuery(searchQuery)
        if (searchContent !== undefined) {
            let {s, page} = {...searchContent}
            return {s, page}
        }
    }

    componentDidMount() {
        let o = this.getSearchContent(this.props.location)
        let {s, page} = {...o}
        if (s !== undefined && s !== this.props.searchContent) {
            this.props.searchAction(s, page)
            this.props.inputChange(s)
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.location.search !== this.props.location.search) {
            let location = nextProps.location
            let o = this.getSearchContent(location)
            let {s} = {...o}
            this.props.searchAction(s)
        }
    }

    showSearchResult() {
        switch (this.props.status) {
            case Status.LOADING: {
                return (
                    <div className="loading-container">
                        <svg className="load" viewBox="25 25 50 50">
                            <circle className="loading" cx="50" cy="50" r="20" fill="none"/>
                        </svg>
                    </div>
                )
            }
            case Status.SUCCESS: {
                return (
                        <SearchList />
                )
            }
            case Status.FAILURE: {
                return (
                    <div className="failed-container">歌曲搜索失败</div>
                )
            }
            default: {
                return (
                    <div></div>
                )
            }
        }
    }

    render() {
        return(
            <div className="search-page-content">
                <SearchBar />
                {this.showSearchResult()}
            </div>
        )

    }
}

const mapStateTopProps = (state) => {
    let theState = state.SearchBarReducer
    return {
        status: theState.status,
        searchResult: theState.searchResult,
        searchContent: theState.searchContent,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchAction: (input, page) => {
            dispatch(fetchSearchResult(input, page))
        },
        inputChange: (input) => {
            dispatch(inputChange(input))
        }
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(SearchPage)