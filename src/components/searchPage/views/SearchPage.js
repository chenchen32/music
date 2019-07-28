import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as Status from '../status'
import {fetchSearchResult, inputChange} from '../actions'
import SearchBar from './SearchBar'
import SearchList from './SearchList'
import {argsFromQuery} from '../../../utils'
import './SearchPage.css'
import Loading from "../../common/Loading"

class SearchPage extends Component {

    componentDidMount() {
        let query = argsFromQuery(this.props.location.search)
        let s = query.s
        let page = Number(query.page)
        if (s !== undefined && s !== this.props.searchContent) {
            this.props.fetchSearchResult(s, page)
            this.props.inputChange(s)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.search !== this.props.location.search) {
            let query = argsFromQuery(this.props.location.search)
            let s = query.s
            let page = Number(query.page)
            this.props.fetchSearchResult(s, page)
        }
    }

    showSearchResult() {
        switch (this.props.status) {
            case Status.LOADING: {
                return (
                    <Loading />
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
        fetchSearchResult: (input, page) => {
            dispatch(fetchSearchResult(input, page))
        },
        inputChange: (input) => {
            dispatch(inputChange(input))
        }
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(SearchPage)