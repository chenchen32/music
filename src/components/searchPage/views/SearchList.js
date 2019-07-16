import React, {Component} from 'react'
import SearchItem from './SearchItem'
import {connect} from 'react-redux'
import PageSelector from "../../common/PageSelector"
import {changePage} from "../actions"
import {withRouter} from "react-router-dom"

class SearchList extends Component {
    constructor(props) {
        super(props)

        this.pushHistory = this.pushHistory.bind(this)
        this.getSelectorInfo = this.getSelectorInfo.bind(this)
    }

    dataCleaning(data) {
        let singerList = data.ar.map(artist => artist.name)
        let singer = singerList.join('/')
        let id = String(data.privilege.id)
        return {
            name: data.name,
            singer,
            time: data.dt / 1000,
            id,
            pic: data.al.picUrl,
            lrc: `https://v1.itooi.cn/netease/lrc?id=${id}`,
            url:`https://v1.itooi.cn/netease/url?id=${id}`,
        }
    }

    pushHistory(newPage) {
        this.props.history.push(`search?s=${this.props.searchContent}&page=${newPage}`)
    }

    getSelectorInfo() {
        let totalCount = this.props.searchResult.data.songCount
        if (totalCount > 600) {
            totalCount = 600
        }
        let pageSize = this.props.pageSize
        let totalPage = Math.ceil(totalCount / pageSize)
        return {
            totalPage,
            currentPage: Number(this.props.searchPage),
        }
    }

    render() {
        let searchData = this.props.searchResult.data.songs
        let selectorInfo = this.getSelectorInfo()
        return(
            <div className="search-list-container">
                <span className="search-head-number">
                </span>
                <div className="search-head-container">
                    <div className="search-head-name name">
                        <span title="歌名">歌曲</span>
                    </div>
                    <div className="search-head-singer name">
                        <span title="歌手">歌手</span>
                    </div>
                    <div className="search-head-time">
                        时长
                    </div>
                </div>
                <div className="search-list">
                    {searchData.map((value, i) => {
                        let num = i + this.props.pageSize * (this.props.searchPage - 1)
                        return (
                            <SearchItem key={i} index={num} result={this.dataCleaning(value)}/>
                        )
                    })}
                </div>
                    <PageSelector selectorInfo={selectorInfo} changePage={this.props.changePage} pushHistory={this.pushHistory}/>
            </div>
        )
    }
}

const mapStateTopProps = (state) => {
    let theState = state.SearchBarReducer
    return {
        searchContent: theState.searchContent,
        searchResult: theState.searchResult,
        searchPage: theState.searchPage,
        pageSize: theState.pageSize,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changePage(page))
        }
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(SearchList))