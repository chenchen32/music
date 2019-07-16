import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SearchItem} from '../../searchPage'
import {deleteItemDetail} from '../actions'
import * as Status from '../status'
import PageSelector from '../../common/PageSelector'
import {albumChangePage} from '../actions'

class ModalPortal extends Component {
    constructor(props) {
        super(props)

        this.deleteDetailInfo = this.deleteDetailInfo.bind(this)
        this.descriptionToggle = this.descriptionToggle.bind(this)
        this.state = {
            isAllDescriptionShowed: false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let body = document.querySelector("body")
        if (this.props.albumStatus !== Status.INIT) {
            body.classList.add('ban-scroll')
        } else {
            body.classList.remove('ban-scroll')
        }
    }

    descriptionToggle() {
        this.setState({
            isAllDescriptionShowed: !this.state.isAllDescriptionShowed,
        })
    }

    deleteDetailInfo() {
        this.props.deleteItemDetail()
        this.setState({
            isAllDescriptionShowed: false,
        })
    }

    dataCleaning(fetchedData) {
        let singerList = fetchedData.artists.map(artist => artist.name)
        let singer = singerList.join('/')
        return {
            id: fetchedData.id,
            name: fetchedData.name,
            singer,
            time: fetchedData.duration / 1000,
            pic: fetchedData.album.blurPicUrl,
            lrc: `https://v1.itooi.cn/netease/lrc?id=${fetchedData.id}`,
            url: `https://v1.itooi.cn/netease/url?id=${fetchedData.id}`,
        }
    }

    getSelectorInfo() {
        let totalPage = Math.ceil(this.props.albumDetailInfo.data.trackCount / this.props.albumPageSize)
        return {
            totalPage,
            currentPage: Number(this.props.albumCurrentPage),
        }
    }

    showAlbumList() {
        switch (this.props.albumStatus) {
            case Status.INIT: {
                return null
            }
            case Status.LOADING: {
                return (
                    <div className="pop-up">
                        <div className="pop-window">
                            <span className="modal-portal-toggle" onClick={this.deleteDetailInfo}>×</span>
                            <div className="loading-container">
                                <svg className="load" viewBox="25 25 50 50">
                                    <circle className="loading" cx="50" cy="50" r="20" fill="none"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                )
            }
            case Status.SUCCESS: {
                let data = this.props.albumDetailInfo.data
                console.log('data', data)
                let {albumCurrentPage, albumPageSize} = {...this.props}
                let start = (albumCurrentPage - 1) * albumPageSize
                let end = start + albumPageSize
                return (
                    <div className="pop-up">
                        <div className="pop-window">
                            <span className="modal-portal-toggle" onClick={this.deleteDetailInfo}>×</span>
                            <div className="album-list-container">
                                <div className={this.state.isAllDescriptionShowed ? "album-list-info all-description-showed" : "album-list-info"}>
                                    <img className="album-list-bg" src={data.coverImgUrl} alt="专辑图片"/>
                                    <span className="album-list-pic">
                                        <img src={data.coverImgUrl} alt="专辑图片"/>
                                    </span>
                                    <div className="album-list-name" title={data.name}>
                                            {`歌单：${data.name}`}
                                    </div>
                                    <p className={this.state.isAllDescriptionShowed ? "album-list-description all-description-showed" : "album-list-description"}>
                                        <span>介绍：</span><br/>
                                        {`${data.description}`}
                                    </p>
                                    <span className="description-toggle" onClick={this.descriptionToggle}>{this.state.isAllDescriptionShowed ? '收起' : '展开'}</span>
                                </div>
                                <div className="album-list-count">
                                    {`歌曲列表 (${data.trackCount}首歌)`}
                                </div>
                                <div className="album-list-items">
                                    {data.tracks.slice(start, end).map((value, i) => {
                                        let index = i + start
                                        return <SearchItem key={index} index={index} result={this.dataCleaning(value)}/>
                                    })}
                                </div>
                                <PageSelector selectorInfo={this.getSelectorInfo()} changePage={this.props.changePage} />
                            </div>
                        </div>
                    </div>
                )
            }
            default: {
                return null
            }
        }
    }

    render() {
        return (
            <div className="pop-up-container">
                {this.showAlbumList()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let theState = state.PlayListReducer
    return {
        albumDetailInfo: theState.albumDetailInfo,
        albumStatus: theState.albumStatus,
        albumCurrentPage: theState.albumCurrentPage,
        albumPageSize: theState.albumPageSize,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItemDetail: () => {
            dispatch(deleteItemDetail())
        },
        changePage: (page) => {
            dispatch(albumChangePage(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPortal)