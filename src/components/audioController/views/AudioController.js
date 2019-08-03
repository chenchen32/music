import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    changeAudioStatus,
    getLyricFromNet,
    saveCurrentLyricIndex,
    changePlayMode,
    playNextSong,
    toggleSongListWindow
} from '../actions'
import {timeFormat, getCurrentSongInfo, changeImgResolution} from '../../../utils'
import * as icon from './icon'

class AudioController extends Component {
    constructor(props) {
        super(props)
        this.mapEnglishToChinese = {
            loop: '列表循环',
            circle: '单曲循环',
            random: '随机播放',
        }
        this.isFirstLoad = true
        this.state = {
            currentTime: null,
            duration: null,
            isHovering: false,
        }
        this.coolDown = false
        this.isSliding = false
        this.audio = React.createRef()
        this.songSlider = React.createRef()
        this.playOrPause = this.playOrPause.bind(this)
        this.clickToSeek = this.clickToSeek.bind(this)
        this.mouseDownToSeek = this.mouseDownToSeek.bind(this)
        this.mouseMoveToSeek = this.mouseMoveToSeek.bind(this)
        this.afterSeek = this.afterSeek.bind(this)
        this.handleHover = this.handleHover.bind(this)
        this.changePlayMode = this.changePlayMode.bind(this)
        this.changeToPlayNextSong = this.changeToPlayNextSong.bind(this)
        this.toggleSongList = this.toggleSongList.bind(this)
        this.getAudioControllerClassName = this.getAudioControllerClassName.bind(this)
    }

    componentDidMount() {
        const a = this.audio.current
        a.addEventListener('loadstart', () => {
            this.props.getLyricFromNet(this.props.currentSongInfo.lrc)
        })
        a.addEventListener('canplay', () => {
            const {currentTime, duration} = a
            this.setState({
                currentTime,
                duration
            })
            let shouldAutoPlay = !this.isFirstLoad
            if (shouldAutoPlay) {
                a.play()
            } else {
                this.isFirstLoad = false
            }
        })
        a.addEventListener('play', () => {
            this.props.changeAudioStatus('play')
        })
        a.addEventListener('pause', () => {
            this.props.changeAudioStatus('pause')
        })
        a.addEventListener('timeupdate', () => {
            if (!this.isSliding) {
                const {currentTime} = a
                this.setState({
                    currentTime
                })
                this.parseLyricIndex(currentTime)
            }
        })
        a.addEventListener('ended', () => {
            let {lengthOfSongList, playMode} = this.props
            if (lengthOfSongList !== 0) {
                this.props.playNextSong(playMode)
                if (lengthOfSongList === 1 || playMode === 'circle') {
                    a.play()
                }
            }
        })
        if (this.isFirstLoad && this.props.lengthOfSongList === 0) {
            this.isFirstLoad = false
        }
        document.body.addEventListener('mouseup', this.afterSeek)
    }

    getNextLyricIndex(currentTime, data, deltaTime) {
        let nextLyricIndex
        let length = data.length
        let theLastLyricTime = data[length - 1].time
        let isAfterTheLastLyric = currentTime >= theLastLyricTime
        let isBetweenTheLastTwoLyric = currentTime <= theLastLyricTime && currentTime >= theLastLyricTime - deltaTime
        if (isAfterTheLastLyric) {
            nextLyricIndex = length - 1
        } else if (isBetweenTheLastTwoLyric) {
            nextLyricIndex = length - 2
        } else {
            nextLyricIndex = data.findIndex((lyricInfo, index, data) => {
                if (index === length -1) {
                    return false
                }
                let isStart = lyricInfo.time - deltaTime <= currentTime
                let isNotEnd = data[index + 1].time - deltaTime >= currentTime
                return isStart && isNotEnd
            })
        }
        return nextLyricIndex
    }

    parseLyricIndex(currentTime, deltaTime=0.2) {
        let data = this.props.currentSongExtraInfo.currentLyric
        if (data.length === 0) {
            return false
        }
        let currentLyricIndex = this.getNextLyricIndex(currentTime, data, deltaTime)
        let indexInStore = this.props.currentSongExtraInfo.currentLyricIndex
        if (currentLyricIndex === indexInStore) {
            return false
        } else {
            this.props.saveCurrentLyricIndex(currentLyricIndex)
        }
    }

    playOrPause() {
        const a = this.audio.current
        if (a.currentSrc === '') {
            return
        }
        if (this.props.AudioStatus === 'pause') {
            a.play()
            this.props.changeAudioStatus('play')
        } else {
            a.pause()
            this.props.changeAudioStatus('pause')
        }
    }

    clickToSeek(event) {
        const a = this.audio.current
        let target = event.target
        if (!target.classList.contains('slider-point')) {
            let { left, width } = event.currentTarget.getBoundingClientRect()
            let clickPosition = (event.clientX - left) / width
            let currentTime = clickPosition * a.duration
            if (!isNaN(currentTime)) {
                a.currentTime = currentTime
            }
        }
    }

    mouseDownToSeek() {
        this.isSliding = true
    }

    mouseMoveToSeek(event) {
        if (!this.isSliding) {
            return
        }
        if (!this.coolDown) {
            this.seek(event)
            this.coolDown = true
            setTimeout(() => {
                this.coolDown = false
            }, 25)
        }
    }

    seek(event) {
        const a = this.audio.current
        let {left, width} = this.songSlider.current.getBoundingClientRect()
        let dragPosition = (event.clientX - left) / width
        if (dragPosition >= 0 && dragPosition <= 1) {
            let currentTime = a.duration * dragPosition
            this.setState({
                currentTime
            })
        }
    }

    afterSeek() {
        if (this.isSliding) {
            const a = this.audio.current
            a.currentTime = this.state.currentTime
            this.isSliding = false
        }
    }

    handleHover() {
        this.setState((state) => ({
            isHovering: !state.isHovering,
        }))
    }

    toggleSongList() {
        this.props.toggleSongListWindow()
        let pop = document.querySelector('.pop-up')
        if (pop === null) {
            let body = document.querySelector("body")
            body.classList.toggle('ban-scroll')
        }
    }

    changePlayMode() {
        let modeList = ['loop', 'circle', 'random']
        let index = modeList.indexOf(this.props.playMode)
        let nextIndex = (index + 1) % modeList.length
        let nextModeType = modeList[nextIndex]
        this.props.changePlayMode(nextModeType)
    }

    changeToPlayNextSong(loopStep) {
        return () => {
            this.props.playNextSong(this.props.playMode, loopStep)
        }
    }

    getAudioControllerClassName() {
        let init = "audio-controller"
        let show = this.props.showSongListWindow ? "playlist-opened" : ""
        let sliding = this.isSliding ? "sliding" : ""
        return [init, show, sliding].join(' ')
    }

    render() {
        let {currentTime, duration} = this.state
        let percentage = (currentTime / duration).toFixed(3) * 100
        let {name, singer, pic, url} = this.props.currentSongInfo
        pic = changeImgResolution(pic, 400)
        let playMode = this.props.playMode
        let playModeTitle = this.mapEnglishToChinese[playMode]
        return (
            <div className={this.getAudioControllerClassName()} onMouseMove={this.mouseMoveToSeek}>
                <audio src={url} ref={this.audio}>
                </audio>
                <div className="album-cover">
                    <img src={pic} alt="专辑图片" />
                </div>
                <div className="extra-info-container">
                    <div className={this.state.isHovering? "song-slider hover" : "song-slider"}
                         onClick={this.clickToSeek}
                         onMouseOver={this.handleHover}
                         onMouseOut={this.handleHover}
                         ref={this.songSlider}
                    >
                        <div className="slider-bg">
                        </div>
                        <div className="slider-progress" style={{width: `${percentage}%`}}>
                        <span className="slider-point" onMouseDown={this.mouseDownToSeek}>
                        </span>
                        </div>
                    </div>
                    <span className="music-timeline">
                        <span id="music-time-now">{timeFormat(currentTime)}</span>
                        <span> / </span>
                        <span id="music-time-all">{timeFormat(duration)}</span>
                    </span>
                    <div className="song-info">
                        <div className="song-info-name" title={name}>{name}</div>
                        <div className="song-info-singer" title={singer}>{singer}</div>
                    </div>
                    <div className="controller-btn">
                        <span className="back-btn" title="上一首(ctrl+←)" onClick={this.changeToPlayNextSong(-1)}>
                            {icon.previousBtn}
                        </span>
                        <span className={["play-btn", this.props.AudioStatus].join(' ')} title="播放/暂停(p)" onClick={this.playOrPause}>
                            {icon.getPlayButtonSvg(this.props.AudioStatus)}
                        </span>
                        <span className="next-btn" title="下一首(ctrl+→)" onClick={this.changeToPlayNextSong(1)}>
                            {icon.nextBtn}
                        </span>
                        <span className="volume-btn icon">
                            {icon.volumeBtn}
                        </span>
                        <span className={`mode-btn icon ${playMode}`} data-mode={playMode} title={playModeTitle} onClick={this.changePlayMode}>
                            {icon.getModeButtonSvg(playMode)}
                        </span>
                        <span className="list-btn icon" title="播放列表" onClick={this.toggleSongList}>
                            {icon.listBtn}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let theState = state.AudioReducer
    let currentSongInfo = getCurrentSongInfo(theState)
    let lengthOfSongList = theState.songList.length
    return {
        lengthOfSongList: lengthOfSongList,
        AudioStatus: theState.AudioStatus,
        currentSongInfo: currentSongInfo,
        currentSongExtraInfo: theState.currentSongExtraInfo,
        playMode: theState.playMode,
        showSongListWindow: theState.showSongListWindow,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeAudioStatus: (status) => {
            dispatch(changeAudioStatus(status))
        },
        getLyricFromNet: (url) => {
            dispatch(getLyricFromNet(url))
        },
        saveCurrentLyricIndex: (currentLyricIndex) => {
            dispatch(saveCurrentLyricIndex(currentLyricIndex))
        },
        changePlayMode: (modeType) => {
            dispatch(changePlayMode(modeType))
        },
        playNextSong: (modeType, loopStep) => {
            dispatch(playNextSong(modeType, loopStep))
        },
        toggleSongListWindow: () => {
            dispatch(toggleSongListWindow())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioController)