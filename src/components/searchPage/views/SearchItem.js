import React, {Component} from 'react'
import {getCurrentSongInfo, timeFormat} from '../../../utils'
import {connect} from 'react-redux'
import {actions} from '../../audioController/'

const appendTheSong = actions.appendTheSong
const playTheSongInPage = actions.playTheSongInPage

class SearchItem extends Component {
    constructor(props) {
        super(props)

        this.handlePlay = this.handlePlay.bind(this)
        this.handleAppend = this.handleAppend.bind(this)
        this.handlePause = this.handlePause.bind(this)
    }

    handlePlay() {
        if (this.props.currentSongId !== this.props.result.id) {
            this.props.playTheSongInPage(this.props.result)
            console.log('this.props.songInfo，第一次放', this.props.result)
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
        let id = this.props.result.id
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

    handleAppend() {
        this.props.appendTheSong(this.props.result)
    }

    render() {
        let result = this.props.result
        let id = this.props.result.id
        let isTheSongPlaying = (this.props.AudioStatus === 'play') && (this.props.currentSongId === id)
        let isOdd = (this.props.index + 1) % 2 !== 0
        return(
            <div className={isOdd ? "search-item-container odd" : "search-item-container"}>
                <span className="search-item-number">{`${this.props.index + 1}.`}</span>
                <div className="search-item-name">
                    <span className="song-name" title={result.name}>{result.name}</span>
                    <span className="search-item-play" onClick={isTheSongPlaying ? this.handlePause : this.handlePlay}>
                        {this.getPlayOrPauseButtonSvg()}
                    </span>
                    <span className="search-item-append" onClick={this.handleAppend}>
                        <svg className="svg-list-icon" viewBox="0 0 1024 1024">
                        <path d="M197.3 197.3c-173.8 173.8-173.8 455.5 0 629.3s455.5 173.8 629.3 0 173.8-455.5 0-629.3-455.5-173.7-629.3 0zM907 512c0 51.3-9.7 101.3-28.9 148.7-19.9 49-49.1 92.9-86.8 130.6s-81.7 66.9-130.6 86.8C613.3 897.3 563.3 907 512 907c-51.3 0-101.3-9.7-148.7-28.9-49-19.9-92.9-49.1-130.6-86.8s-66.9-81.7-86.8-130.6C126.7 613.3 117 563.3 117 512c0-51.3 9.7-101.3 28.9-148.7 19.9-49 49.1-92.9 86.8-130.6s81.7-66.9 130.6-86.8C410.7 126.7 460.7 117 512 117c51.3 0 101.3 9.7 148.7 28.9 49 19.9 92.9 49.1 130.6 86.8s66.9 81.7 86.8 130.6C897.3 410.7 907 460.7 907 512zM537 262v225h225v50H537v225h-50V537H262v-50h225V262h50z">
                        </path>
                        </svg>
                    </span>
                </div>
                <div className="search-item-singer name">
                    <span title={result.singer}>{result.singer}</span>
                </div>
                <div className="search-item-time">
                    {timeFormat(result.time)}
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
        appendTheSong: (songInfo) => {
            dispatch(appendTheSong(songInfo))
        },
        playTheSongInPage: (songInfo) => {
            dispatch(playTheSongInPage(songInfo))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem)