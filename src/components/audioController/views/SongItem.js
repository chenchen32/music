import React, {Component} from 'react'
import {timeFormat, getCurrentSongInfo} from '../../../utils'
import {connect} from "react-redux"
import {playTheSongInList, deleteTheSong} from '../actions'

class SongItem extends Component {
    constructor(props) {
        super(props)

        this.handlePlay = this.handlePlay.bind(this)
        this.handlePause = this.handlePause.bind(this)
        // this.handleDelete = this.handleDelete.bind(this)
    }

    handlePlay() {
        if (this.props.currentSongId !== this.props.songInfo.id) {
            this.props.playTheSongInList(this.props.songIndex)
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

    getPlayOrPauseButtonSvg() {
        let {id} = this.props.songInfo
        let isTheSongPlaying = (this.props.AudioStatus === 'play') && (this.props.currentSongId === id)
        if (isTheSongPlaying) {
            return (
                <svg className="svg-list-icon" viewBox="0 0 1024 1024">
                    <path d="M910.8 303.6c-5.4-10.5-16.3-17.8-28.9-17.8-17.8 0-32.2 14.4-32.2 32.1 0 6 1.7 11.7 4.6 16.5l-0.1 0.1c26.9 52.4 42.1 111.8 42.1 174.7 0 211.6-171.6 383.2-383.2 383.2S129.8 720.8 129.8 509.2 301.4 126.1 513 126.1c62.5 0 121.5 15 173.6 41.5l0.2-0.4c4.6 2.6 10 4.1 15.7 4.1 17.8 0 32.2-14.4 32.2-32.1 0-13.1-7.9-24.4-19.3-29.4C654.6 78.9 585.9 61.5 513 61.5 265.7 61.5 65.3 262 65.3 509.2S265.7 956.9 513 956.9s447.7-200.4 447.7-447.7c0-74.1-18-144-49.9-205.6z">
                    </path>
                    <path d="M385.4 352.2V672c0 17.5 14.3 31.9 31.9 31.9 17.6 0 32-14.4 31.9-31.9V352.2c0-17.5-14.3-31.9-31.9-31.9-17.5 0-31.9 14.3-31.9 31.9zM578.9 352.2V672c0 17.5 14.3 31.9 31.9 31.9 17.5 0 31.9-14.4 31.9-31.9V352.2c0-17.5-14.3-31.9-31.9-31.9-17.5 0-31.9 14.3-31.9 31.9z">
                    </path>
                    <path d="M772.7 217.7a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z">
                    </path>
                </svg>
            )
        } else {
            return (
                <svg className="svg-list-icon" viewBox="0 0 1024 1024">
                    <path d="M772.7 217.7a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z">
                    </path>
                    <path d="M415.8 679.9c5.9 0 11.5-1.6 16.2-4.5l231.1-134.6c10.9-5.2 18.5-16.3 18.5-29.2 0-11.9-6.4-22.3-16-27.8L439.7 352.2c-5.8-6.7-14.4-10.9-23.9-10.9-17.6 0-31.8 14.4-31.8 32.1 0 0.6 0 1.2 0.1 1.8l-0.4 0.2 0.5 269c-0.1 1.1-0.2 2.2-0.2 3.4 0 17.7 14.3 32.1 31.8 32.1z">
                    </path>
                    <path d="M909.8 306.6c-5.4-10.5-16.3-17.8-28.9-17.8-17.8 0-32.2 14.4-32.2 32.1 0 6 1.7 11.7 4.6 16.5l-0.1 0.1c26.9 52.4 42.1 111.8 42.1 174.7 0 211.6-171.6 383.2-383.2 383.2S128.8 723.8 128.8 512.2 300.4 129.1 512 129.1c62.5 0 121.5 15 173.6 41.5l0.2-0.4c4.6 2.6 10 4.1 15.7 4.1 17.8 0 32.2-14.4 32.2-32.1 0-13.1-7.9-24.4-19.3-29.4C653.6 81.9 584.9 64.5 512 64.5 264.7 64.5 64.3 265 64.3 512.2S264.7 959.9 512 959.9s447.7-200.4 447.7-447.7c0-74.1-18-144-49.9-205.6z">
                    </path>
                </svg>
            )
        }
    }

    // handleDelete(songIndex) {
    //     return () => {
    //         this.props.deleteTheSong(songIndex)
    //     }
    // }

    render() {
        let {id, name, singer, time} = this.props.songInfo
        let isTheSongPlaying = (this.props.AudioStatus === 'play') && (this.props.currentSongId === id)
        return (
            <div className="song-list-item-container" style={isTheSongPlaying ? {color: 'rgb(255, 255, 255)'} : {}}>
                <div className="song-list-item-name">
                    <span className="song-name" title={name}>{name}</span>
                    <span className="song-list-item-play" onClick={isTheSongPlaying ? this.handlePause : this.handlePlay}>
                        {this.getPlayOrPauseButtonSvg()}
                    </span>
                    <span className="song-list-item-delete" onClick={this.props.deleteTheSong.bind(this, this.props.songIndex)}>
                        <svg className="svg-list-icon" viewBox="0 0 1024 1024">
                            <path d="M897.2 128H578.7c-1.6-34.7-30.2-62.4-65.3-62.4s-63.8 27.7-65.3 62.4h-320c-17.5 0-31.9 14.4-31.9 31.9s14.4 31.9 31.9 31.9H192v639.8c0 70.4 57.6 128 128 128h384.1c70.4 0 128-57.6 128-128V676.2c0.1-1.2 0.2-2.4 0.2-3.6 0.1-17.8-14.4-32.1-32.1-32.1-17.8 0-32.2 14.4-32.2 32.1v159.1c0 35.2-28.8 64-64 64H320c-35.2 0-64-28.8-64-64V191.8h511.9v223.1c0 17.7 14.4 32.1 32.2 32.1s32.2-14.4 32.2-32.1c0-1.2-0.1-2.4-0.2-3.6V191.8h65.1c17.6 0 31.9-14.4 31.9-31.9S914.7 128 897.2 128z">
                            </path>
                            <path d="M386.9 350.6v386.6c0 16.8 13.8 30.6 30.6 30.6s30.6-13.8 30.6-30.5V350.6c0-16.8-13.8-30.6-30.6-30.6s-30.6 13.8-30.6 30.6zM576.7 350.6v386.6c0 16.8 13.8 30.6 30.6 30.6s30.6-13.8 30.6-30.5V350.6c0-16.8-13.8-30.6-30.6-30.6s-30.6 13.8-30.6 30.6z">
                            </path>
                            <path d="M768 543.7a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z">
                            </path>
                        </svg>
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