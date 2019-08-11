import React, {Component} from 'react'
import {timeFormat, getCurrentSongInfo} from '../../../utils'
import {connect} from "react-redux"
import {playTheSongInList, deleteTheSong} from '../actions'
import {deleteBtn, getPlayButtonSvgInList} from './icon'

class SongItem extends Component {
    constructor(props) {
        super(props)

        this.handlePlay = this.handlePlay.bind(this)
        this.handlePause = this.handlePause.bind(this)
    }

    handlePlay() {
        if (this.props.currentSongId !== this.props.songInfo.id) {
            this.props.playTheSongInList(this.props.songIndex)
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
        let {id, name, singer, time} = this.props.songInfo
        let isTheSongPlaying = (this.props.AudioStatus === 'play') && (this.props.currentSongId === id)
        return (
            <div className="song-list-item-container" style={isTheSongPlaying ? {color: 'rgb(255, 255, 255)'} : {}}>
                <div className="song-list-item-name">
                    <span className="song-name" title={name}>{name}</span>
                    <span className="song-list-item-play vertical-middle" onClick={isTheSongPlaying ? this.handlePause : this.handlePlay}>
                        {getPlayButtonSvgInList(isTheSongPlaying)}
                    </span>
                    <span className="song-list-item-delete vertical-middle" onClick={this.props.deleteTheSong.bind(this, this.props.songIndex)}>
                        {deleteBtn}
                    </span>
                </div>
                <div className="song-list-item-singer name">
                    <span title={singer}>{singer}</span>
                </div>
                <div className="song-list-item-time">
                    {timeFormat(time)}
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

const mapDispatchToProps = (dispatch) => {
    return {
        playTheSongInList: (songInfo) => {
            dispatch(playTheSongInList(songInfo))
        },
        deleteTheSong: (songIndex) => {
            dispatch(deleteTheSong(songIndex))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem)