import React, {Component} from 'react'
import {connect} from 'react-redux'
import SongItem from './SongItem'
import {getCurrentSongInfo} from '../../utils'

class SongList extends Component {
    autoScrollLyricList(div, currentLyricIndex) {
        if (div !== null) {
            let {height} = div.getBoundingClientRect()
            let i = Math.floor(height / 46 / 2)
            div.scrollTop = currentLyricIndex * 46 - 46 * i
        }
    }

    render() {
        let {pic} = this.props.currentSongInfo
        let defaultPic = "http://s4.music.126.net/style/web2/img/default/default_album.jpg"
        let picUrl = pic || defaultPic
        let lyric = this.props.currentSongExtraInfo.currentLyric
        let currentLyricIndex = this.props.currentSongExtraInfo.currentLyricIndex
        return (
            <div className="song-list hidden">
                <div className="song-list-bg">
                </div>
                <div className="song-list-img" style={{backgroundImage: `url(${picUrl})`}}>
                </div>
                <div className="song-list-header">播放列表</div>
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
                    {this.props.songList.map((value, index) => {
                        return <SongItem key={index} songIndex={index} songInfo={value}/>
                    })}
                </div>
                <div className="lyric-list" ref={(div) => {this.autoScrollLyricList(div, currentLyricIndex)}}>
                    {
                        lyric.map((value, index) => {
                            return <p className={(currentLyricIndex === index)? "lyric-item active" : "lyric-item"} key={index}>{value[1]}</p>
                    })}
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
    }
}

export default connect(mapStateToProps, null)(SongList)