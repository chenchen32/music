import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCurrentSongInfo} from "../../utils"

class AlbumListItem extends Component {
    constructor(props) {
        super(props)

        this.handlePlay = this.handlePlay.bind(this)
        this.handlePause = this.handlePause.bind(this)
    }

    handlePlay() {
        if (this.props.currentSongId !== this.props.result.id) {
            this.props.playTheSongInPage(this.props.result)
            console.log('this.props.songInfo，第一次放', this.props.songInfo)
        } else {
            let audio = document.querySelector('audio')
            audio.play()
        }
    }

    handlePause() {
        let audio = document.querySelector('audio')
        audio.pause()
    }

    render() {
        let data = this.props.data
        let isTheSongPlaying = (this.props.AudioStatus === 'play') && (this.props.currentSongId === data.id)
        return (
            <div className="album-list-item">
                <div className="album-list-song-name">
                    <span className="song-name" title={data.name}>{data.name}</span>
                    <span className="album-list-item-play" onClick={isTheSongPlaying ? this.handlePause : this.handlePlay}>{isTheSongPlaying ? '暂停' : '播放'}</span>
                </div>
                <div className="album-list-singer" title={data.singer}>
                    {data.singer}
                </div>
                <div className="album-list-time">
                    {data.time}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let theState = state.AudioReducer
    let currentSongInfo = getCurrentSongInfo(theState)
    let currentSongId = currentSongInfo.id
    return {
        AudioStatus: theState.AudioStatus,
        currentSongId: currentSongId,
    }
}

export default connect(mapStateToProps, null)(AlbumListItem)