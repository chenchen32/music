import React, { Component } from 'react'
import * as Status from '../status'
import {connect} from 'react-redux'
import {fetchHotPlayList, playListTagChange, playListPageChangePage} from '../actions'
import {withRouter} from 'react-router-dom'
import PlayListItem from './PlayListItem'
import {argsFromQuery} from '../../../utils'
import PageSelector from '../../common/PageSelector'
import Loading from "../../common/Loading"

class PlayList extends Component {
    constructor(props) {
        super(props)

        this.pushHistory = this.pushHistory.bind(this)
        this.getSelectorInfo = this.getSelectorInfo.bind(this)
    }

    componentDidMount() {
        if (this.props.status !== 'success') {
            let params = argsFromQuery(this.props.location.search)
            let activeTag = params.cat
            let page = params.page
            this.props.fetchHotPlayList(activeTag, page)
            this.props.playListTagChange(decodeURI(activeTag))
            this.props.changePage(page)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location !== prevProps.location) {
            let params = argsFromQuery(this.props.location.search)
            let activeTag = params.cat
            let page = params.page
            this.props.fetchHotPlayList(activeTag, page)
        }
    }

    pushHistory(newPage) {
        this.props.history.push(`playlist?cat=${this.props.activeTag}&page=${newPage}`)
    }

    getSelectorInfo() {
        return {
            totalPage: this.props.totalPage,
            currentPage: Number(this.props.currentPage),
        }
    }

    showHotPlayList() {
        switch (this.props.status) {
            case Status.LOADING: {
                return (
                    <Loading />
                )
            }
            case Status.SUCCESS: {
                let playListResult = this.props.playListResult
                return (
                    <div className="playlist-result">
                        {playListResult.map((value, index) => {
                            return <PlayListItem key={index} itemInfo={value} />
                        })}
                        <PageSelector selectorInfo={this.getSelectorInfo()} changePage={this.props.changePage} pushHistory={this.pushHistory}/>
                    </div>
                )
            }
            case Status.FAILURE: {
                return (
                    <div className="failed-container">热门歌单加载失败</div>
                )
            }
            default: {
                return (
                    <div>PlayList</div>
                )
            }
        }
    }

    render() {
        return (
            this.showHotPlayList()
        )
    }
}

const mapStateTopProps = (state) => {
    let theState = state.PlayListReducer
    return {
        status: theState.playListStatus,
        playListResult: theState.playListResult,
        activeTag: theState.activeTag,
        currentPage: theState.currentPage,
        pageSize: theState.pageSize,
        totalPage: theState.totalPage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchHotPlayList: (category, page) => {
            dispatch(fetchHotPlayList(category, page))
        },
        playListTagChange: (tagName) => {
            dispatch(playListTagChange(tagName))
        },
        changePage: (page) => {
            dispatch(playListPageChangePage(page))
        }
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(PlayList))