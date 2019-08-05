import React, {Component} from 'react'
import {connect} from 'react-redux'
import SongItem from './SongItem'
import {getCurrentSongInfo, changeImgResolution} from '../../../utils'

class SongList extends Component {
    constructor(props) {
        super(props)
        this.list = React.createRef()
    }

    getTheActiveLyricOffset() {
        const list = this.list.current
        let activeLyric = document.querySelector('.active')
        if (activeLyric !== null) {
            let {height} = list.getBoundingClientRect()
            let i = Math.floor(height / 40 / 2)
            list.scrollTop = activeLyric.offsetTop - 40 * i
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getTheActiveLyricOffset()
    }

    render() {
        let picUrl = this.props.currentSongInfo.pic
        picUrl = changeImgResolution(picUrl, 400)
        let {currentLyric, currentLyricIndex} = this.props.currentSongExtraInfo
        let length = this.props.songList.length
        return (
            <div className={this.props.showSongListWindow ? "song-list" : "song-list hidden"}>
                <div className="song-list-bg">
                </div>
                <div className="song-list-img" style={{backgroundImage: `url(${picUrl})`}}>
                </div>
                <span className="song-list-header">播放列表&nbsp;&nbsp;&nbsp;{`(总${length}首)`}</span>
                <div className="song-list-container">
                    <div className="song-list-head-container">
                        <div className="song-list-item-name">
                            <span title="">歌曲</span>
                        </div>
                        <div className="song-list-item-singer">
                            <span title="">歌手</span>
                        </div>
                        <div className="song-list-item-time">时长</div>
                    </div>
                    {
                        this.props.songList.map((value, index) => {
                            return <SongItem key={index} songIndex={index} songInfo={value}/>
                    })}
                </div>
                <div className="lyric-list" ref={this.list}>
                    {
                        currentLyric.map((value, index) => {
                            if (value.translatedLyric === null) {
                                return <p className={(currentLyricIndex === index)? "lyric-item active" : "lyric-item"} key={index}>{value.lyric}</p>
                            } else {
                                return (
                                    <p className={(currentLyricIndex === index)? "lyric-item active" : "lyric-item"} key={index}>
                                        {value.lyric}<br/>
                                        {value.translatedLyric}
                                    </p>
                                )
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let theState = state.AudioReducer
    let currentSongInfo = getCurrentSongInfo(theState)
    return {
        songList: theState.songList,
        currentSongInfo: currentSongInfo,
        currentSongExtraInfo: theState.currentSongExtraInfo,
        showSongListWindow: theState.showSongListWindow,
    }
}

export default connect(mapStateToProps, null)(SongList)