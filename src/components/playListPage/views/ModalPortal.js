import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SearchItem} from "../../searchPage/"
import {deleteItemDetail} from '../actions'
import * as Status from "../status"

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
        // let musicPlayer = document.querySelector('.music-controller')
        if (this.props.albumStatus !== Status.INIT) {
            body.classList.add('ban-scroll')
            // musicPlayer.classList.add('ban-scrollbar')
        } else {
            body.classList.remove('ban-scroll')
            // musicPlayer.classList.remove('ban-scrollbar')
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
                return (
                    <div className="pop-up">
                        <div className="pop-window">
                            <span className="modal-portal-toggle" onClick={this.deleteDetailInfo}>×</span>
                            <div className="album-list-container">
                                <div className={this.state.isAllDescriptionShowed ? "album-list-info all-description-showed" : "album-list-info"}>
                                    <img className="album-list-bg" src={data.songListPic} alt="专辑图片"/>
                                    <span className="album-list-pic">
                                        <img src={data.songListPic} alt="专辑图片"/>
                                    </span>
                                    <div className="album-list-name" title={data.songListName}>
                                            {`歌单：${data.songListName}`}
                                    </div>
                                    <p className={this.state.isAllDescriptionShowed ? "album-list-description all-description-showed" : "album-list-description"}>
                                        <span>介绍：</span><br/>
                                        {`${data.songListDescription}`}
                                    </p>
                                    {/*<p className={this.state.isAllDescriptionShowed ? "after-description hidden" : "after-description"}>*/}
                                        {/*...*/}
                                    {/*</p>*/}
                                    <span className="description-toggle" onClick={this.descriptionToggle}>{this.state.isAllDescriptionShowed ? '收起' : '展开'}</span>
                                </div>
                                <div className="album-list-count">
                                    {`歌曲列表 (${data.songListCount}首歌)`}
                                </div>
                                <div className="album-list-items">
                                    {data.songs.map((value, index) => {
                                        return <SearchItem key={index} index={index} result={value}/>
                                    })}
                                </div>
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
        albumStatus: theState.albumStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItemDetail: () => {
            dispatch(deleteItemDetail())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPortal)