import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changeAudioStatus, getLyricFromNet, saveCurrentLyricIndex, changePlayMode, playNextSong} from "../actions"
import {timeFormat, getCurrentSongInfo} from '../../../utils'

class AudioController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTime: null,
            duration: null,
            sliding: false,
            hover: false,
        }
        this.audio = React.createRef()
        this.songSlider = React.createRef()
        this.playOrPause = this.playOrPause.bind(this)
        this.clickToSeek = this.clickToSeek.bind(this)
        this.dragToSeek = this.dragToSeek.bind(this)
        this.AfterDragToSeek = this.AfterDragToSeek.bind(this)
        this.handleHover = this.handleHover.bind(this)
        this.changePlayMode = this.changePlayMode.bind(this)
        this.changeToPlayNextSong = this.changeToPlayNextSong.bind(this)
        this.toggleList = this.toggleList.bind(this)
    }

    componentDidMount() {
        const a = this.audio.current
        a.addEventListener('canplay', () => {
            let lrcUrl = this.props.currentSongInfo.lrc
            this.props.getLyricFromNet(lrcUrl)
            const {currentTime, duration} = a
            this.setState({
                currentTime,
                duration
            })
            console.log('加载完了')
            a.play()
        })
        a.addEventListener('play', () => {
            console.log('在播放了')
            this.props.changeAudioStatus('play')
        })
        a.addEventListener('pause', () => {
            console.log('暂停了一下')
            this.props.changeAudioStatus('pause')
        })
        a.addEventListener('timeupdate', () => {
            if (!this.state.sliding) {
                const {currentTime} = a
                this.setState({
                    currentTime
                })
                this.parseCurrentTimeToGetLyricIndex(currentTime)
            }
        })
        a.addEventListener('ended', () => {
            this.props.playNextSong(this.props.playMode)
            if (this.props.lengthOfSongList === 1 || this.props.playMode === 'circle') {
                a.play()
            }
        })
    }

    parseCurrentTimeToGetLyricIndex(currentTime) {
        let lyricArray = this.props.currentSongExtraInfo.currentLyric
        for (let i = 0; i < lyricArray.length; i++) {
            let time = lyricArray[i][0]
            if (Math.abs(time - currentTime) < 0.3) {
                this.props.saveCurrentLyricIndex(i)
                break
            }
        }

    }

    getLyricIndexWhenJumpSong(currentTime) {
        let lyricArray = this.props.currentSongExtraInfo.currentLyric
        let index = -1
        for (let i = 0; i < lyricArray.length; i++) {
            let time = lyricArray[i][0]
            if (time > currentTime) {
                index = i - 1
                break
            }
        }
        if (index === -1) {
            index = lyricArray.length - 1
        }
        this.props.saveCurrentLyricIndex(index)
    }

    playOrPause() {
        if (this.props.currentSongInfo.id === -1) {
            return 0
        }
        const a = this.audio.current
        if (this.props.AudioStatus === 'pause') {
            a.play()
            this.props.changeAudioStatus('play')
        } else {
            a.pause()
            this.props.changeAudioStatus('pause')
        }
    }

    getPlayButtonSvg() {
        switch (this.props.AudioStatus) {
            case 'play': {
                return (
                    <svg className="svg-icon" viewBox="0 0 1024 1024">
                        <path d="M243.2 208h166.4v608H243.2zM614.4 208h166.4v608h-166.4z">
                        </path>
                    </svg>
                )
            }
            case 'pause': {
                return (
                    <svg className="svg-icon" viewBox="0 0 1024 1024">
                        <path d="M289.5 844.3V179.7l445 332.3-445 332.3z">
                        </path>
                    </svg>
                )
            }
            default: {
                return (
                    <div>default</div>
                )
            }
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
                this.getLyricIndexWhenJumpSong(currentTime)
            } else {
                alert(`currentTime出现NaN了${currentTime}`)
            }
        }
    }

    dragToSeek() {
        let isRunning = false
        let isFirstDrag = true
        return (event) => {
            event.persist()
            if (isRunning || isFirstDrag ) {
                isFirstDrag = false
                return
            }
            isRunning = true
            window.requestAnimationFrame(() => {
                this.seek(event)
                isRunning = false
            })
            if (!this.state.sliding) {
                this.setState({
                    sliding: true
                })
            }
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

    AfterDragToSeek() {
        const a = this.audio.current
        a.currentTime = this.state.currentTime
        this.getLyricIndexWhenJumpSong(this.state.currentTime)
        this.setState({
            sliding: false
        })
    }

    handleHover() {
        this.setState({
            hover: !this.state.hover
        })
    }

    toggleList() {
        let list = document.querySelector('.song-list')
        list.classList.toggle('hidden')
        let pop = document.querySelector('.pop-up')
        if (pop === null) {
            let body = document.querySelector("body")
            body.classList.toggle('ban-scroll')
        }
        let musicPlayer = document.querySelector('.audio-controller')
        musicPlayer.classList.toggle('playlist-opened')
    }

    changePlayMode() {
        let modeList = ['loop', 'circle', 'random']
        let index = modeList.indexOf(this.props.playMode)
        let nextIndex = (index + 1) % modeList.length
        let nextModeType = modeList[nextIndex]
        this.props.changePlayMode(nextModeType)
    }

    getModeButtonSvg() {
        switch (this.props.playMode) {
            case 'loop': {
                return (
                    <svg className="svg-icon" viewBox="0 0 1024 1024">
                        <path d="M922 607.1V887H102V157h612.2V58.2l200 125-200 125V207H152v630h720V607.1h50z">
                        </path>
                    </svg>
                )
            }
            case 'circle': {
                return (
                    <svg className="svg-icon" viewBox="0 0 1024 1024">
                        <path
                            d="M922 607.1V887H102V157h612.2V58.2l200 125-200 125V207H152v630h720V607.1h50zM560.5 737.6V306.4h-34c-9.2 18.6-24.8 37.7-46.9 57.4-22.1 19.7-47.9 36.5-77.3 50.4v51c16.4-6.1 34.9-15.1 55.5-27.2s37.3-24.2 50-36.3v336h52.7z">
                        </path>
                    </svg>
                )
            }
            case 'random': {
                return (
                    <svg className="svg-icon" viewBox="0 0 1024 1024">
                        <path d="M726.6 774H594.4L458.8 512l135.6-262h132.2v98.7l200-125-200-125V200H564.4L430.7 457.7 297.4 200h-200v50h169.2l135.9 262-135.9 262H97.4v50h200l133.3-257.7L564.4 824h162.2v101.3l200-125-200-125z">
                        </path>
                    </svg>
                )
            }
            default: {
                return <div>default</div>
            }
        }
    }

    changeToPlayNextSong(loopStep) {
        return () => {
            this.props.playNextSong(this.props.playMode, loopStep)
        }
    }

    render() {
        let {currentTime, duration} = this.state
        let {name, singer, pic, url} = this.props.currentSongInfo
        let playMode = this.props.playMode
        let mapEnglishToChinese = {
            loop: '列表循环',
            circle: '单曲循环',
            random: '随机播放',
        }
        let playModeTitle = mapEnglishToChinese[this.props.playMode]
        return (
            <div className="audio-controller">
                <audio src={url} ref={this.audio}>
                </audio>
                <div className="album-cover">
                    <img src={pic} alt="专辑图片" />
                </div>
                <div className="extra-info-container">
                    <div className={this.state.hover? "song-slider hover" : "song-slider"} onClick={this.clickToSeek} onMouseOver={this.handleHover} onMouseOut={this.handleHover} ref={this.songSlider}>
                        <div className="slider-bg">
                        </div>
                        <div className="slider-progress" style={{width: `${ currentTime / duration * 100 }%`}}>
                        <span className="slider-point" draggable="true" onDrag={this.dragToSeek()} onDragEnd={this.AfterDragToSeek}>
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
                            <svg className="svg-icon" viewBox="0 0 1024 1024">
                                <path d="M362.3 512l445-332.3v664.5L362.3 512zM216.7 179.7h80v664.5h-80V179.7z">
                                </path>
                            </svg>
                        </span>
                        <span className={["play-btn", this.props.AudioStatus].join(' ')} title="播放/暂停(p)" onClick={this.playOrPause}>
                            {this.getPlayButtonSvg()}
                        </span>
                        <span className="next-btn" title="下一首(ctrl+→)" onClick={this.changeToPlayNextSong(1)}>
                            <svg className="svg-icon" viewBox="0 0 1024 1024">
                                <path d="M216.7 844.3V179.7l445 332.3-445 332.3z m590.6 0h-80V179.7h80v664.6z">
                                </path>
                            </svg>
                        </span>
                        <span className="volume-btn icon">
                            <svg className="svg-icon" viewBox="0 0 1024 1024">
                                <path d="M697.5 76l-497 230.6-147.3-20v420l147.3-20 497 230.6V76z m-50 760.7l-424.9-195-13.7-6.8-15.2 2.1-90.6 12.3V343.8l90.6 12.3 15.2 2.1 13.7-6.8 424.9-194.9v680.2zM812 612h-50V412h50v200z m204.7 200h-50V212h50v600zM914.3 712h-50V312h50v400z">
                                </path>
                            </svg>
                        </span>
                        <span className={`mode-btn icon ${playMode}`} data-mode={playMode} title={playModeTitle} onClick={this.changePlayMode}>
                            {this.getModeButtonSvg()}
                        </span>
                        <span className="list-btn icon" title="播放列表" onClick={this.toggleList}>
                            <svg className="svg-icon" viewBox="0 0 1024 1024">
                                <path d="M91.9 165.2h50v50h-50v-50z m150.2 0v50h690v-50h-690zM91.9 429.7h50v-50h-50v50z m150.2 0h690v-50h-690v50zM91.9 644.3h50v-50h-50v50z m150.2 0h690v-50h-690v50zM91.9 858.8h50v-50h-50v50z m150.2 0h690v-50h-690v50z">
                                </path>
                            </svg>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioController)