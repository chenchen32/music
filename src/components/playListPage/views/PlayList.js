import React, { Component } from 'react'
import * as Status from "../status"
import {connect} from 'react-redux'
import {fetchHotPlayList, playListTagChange} from "../actions"
import {withRouter} from 'react-router-dom'
import PlayListItem from './PlayListItem'

class PlayList extends Component {
    constructor(props) {
        super(props)

        this.onLoad = this.onLoad.bind(this)
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

    getPlayListActiveTag(location) {
        let path = location.search
        let query = path.slice(1)
        let o = this.argsFromQuery(query)
        let activeTag = o['cat']
        return activeTag
    }

    componentDidMount() {
        if (this.props.status !== 'success') {
            this.onLoad()
            let activeTag = this.getPlayListActiveTag(this.props.location)
            this.props.playListTagChange(decodeURI(activeTag))
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.location !== nextProps.location) {
            let activeTag = this.getPlayListActiveTag(nextProps.location)
            this.props.fetchHotPlayList(activeTag, 1)
        }
    }

    onLoad() {
        let activeTag = this.getPlayListActiveTag(this.props.location)
        this.props.fetchHotPlayList(activeTag, 1)
    }

    showHotPlayList() {
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
                let playListResult = this.props.playListResult.data
                return (
                    <div className="playlist-result">
                        {playListResult.map((value, index) => {
                            return <PlayListItem key={index} itemInfo={value} />
                        })}
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
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(PlayList))