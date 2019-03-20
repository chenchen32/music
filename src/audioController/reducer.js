import * as audioController from './actionTypes'
import {saveSongToLocalStorage, deleteSongInLocalStorage} from "../untils"

export default (state, action) => {
    switch (action.type) {
        case audioController.CHANGE_AUDIO_STATUS: {
            return {...state, AudioStatus: action.status}
        }
        case audioController.APPEND_THE_SONG: {
            let songList = state['songList']
            let isTheSongNotExisted = songList.every((value) => {
                return (value.id !== action.songInfo.id)
            })
            if (isTheSongNotExisted) {
                let cloneList = JSON.parse(JSON.stringify(songList))
                cloneList.push(action.songInfo)
                saveSongToLocalStorage(action.songInfo)
                return {
                    ...state,
                    songList: cloneList,
                }
            } else {
                return {
                    ...state
                }
            }
        }
        case audioController.DELETE_THE_SONG: {
            let songList = state['songList']
            let cloneList = JSON.parse(JSON.stringify(songList))
            let songIndex = action.songIndex
            let currentSongIndex = state.currentSongExtraInfo.currentSongIndex
            let listLength = cloneList.length
            deleteSongInLocalStorage(songIndex)
            cloneList.splice(songIndex, 1)
            if (listLength === 1) {
                return {
                    ...state,
                    songList: [],
                    currentSongExtraInfo: {
                        ...state.currentSongExtraInfo,
                        currentSongIndex: -1,
                    }
                }
            }
            if (currentSongIndex !== songIndex) {
                if (currentSongIndex < songIndex) {
                    return {
                        ...state,
                        songList: cloneList,
                    }
                } else {
                    let newSongIndex = currentSongIndex - 1
                    console.log('删除了前面的歌')
                    return {
                        ...state,
                        songList: cloneList,
                        currentSongExtraInfo: {
                            ...state.currentSongExtraInfo,
                            currentSongIndex: newSongIndex,
                        }
                    }
                }

            } else {
                if (currentSongIndex !== listLength - 1) {
                    let newSongIndex = currentSongIndex
                    return {
                        ...state,
                        songList: cloneList,
                        currentSongExtraInfo: {
                            ...state.currentSongExtraInfo,
                            currentSongIndex: newSongIndex,
                        }
                    }
                } else {
                    let newSongIndex = currentSongIndex - 1
                    return {
                        ...state,
                        songList: cloneList,
                        currentSongExtraInfo: {
                            ...state.currentSongExtraInfo,
                            currentSongIndex: newSongIndex,
                        }
                    }
                }
            }
        }
        case audioController.PLAY_THE_SONG_IN_PAGE: {
            let songList = state['songList']
            let currentSongIndex = -1
            let isTheSongNotExisted = songList.every((value, index) => {
                currentSongIndex = index
                return (value.id !== action.songInfo.id)
            })
            console.log('currentSongIndex', currentSongIndex)
            if (isTheSongNotExisted) {
                let cloneList = JSON.parse(JSON.stringify(songList))
                cloneList.push(action.songInfo)
                saveSongToLocalStorage(action.songInfo)
                return {
                    ...state,
                    songList: cloneList,
                    currentSongExtraInfo: {
                        ...state.currentSongExtraInfo,
                        currentSongIndex: cloneList.length - 1,
                        currentLyricIndex: -1,
                    },
                }
            } else {
                return {
                    ...state,
                    currentSongExtraInfo: {
                        ...state.currentSongExtraInfo,
                        currentSongIndex,
                        currentLyricIndex: -1,
                    },
                }
            }
        }
        case audioController.PLAY_THE_SONG_IN_LIST: {
            return {
                ...state,
                currentSongExtraInfo: {
                    ...state.currentSongExtraInfo,
                    currentSongIndex: action.songIndex,
                    currentLyricIndex: -1,
                }
            }
        }
        case audioController.PLAY_NEXT_SONG: {
            let modeType = action.modeType
            let currentSongIndex = state.currentSongExtraInfo.currentSongIndex
            let LengthOfSongList = state.songList.length
            let mapModeTypeToNextStep = {
                loop: action.loopStep,
                circle: 0,
                random: parseInt(LengthOfSongList * Math.random()),
            }
            let step = mapModeTypeToNextStep[modeType]
            let nextSongIndex = (currentSongIndex + step + LengthOfSongList) % LengthOfSongList
            return {
                ...state,
                currentSongExtraInfo: {
                    ...state.currentSongExtraInfo,
                    currentSongIndex: nextSongIndex,
                    currentLyricIndex: -1,
                },
            }
        }
        case audioController.GET_LYRIC: {
            return {
                ...state,
                currentSongExtraInfo: {
                    ...state.currentSongExtraInfo,
                    currentLyric: action.lyric,
                },
            }
        }
        case audioController.GET_CURRENT_TIME: {
            let index = action.currentLyricIndex
            if (index === undefined) {
                return {
                    ...state,
                }
            } else {
                return {
                    ...state,
                    currentSongExtraInfo: {
                        ...state.currentSongExtraInfo,
                        currentLyricIndex: index,
                    },
                }
            }
        }
        case audioController.CHANGE_PLAY_MODE: {
            return {
                ...state,
                playMode: action.modeType,
            }
        }
        default: {
            return state === undefined ? {} : state
        }
    }
}