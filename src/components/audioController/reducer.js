import * as audioController from './actionTypes'
import {saveSongToLocalStorage, deleteSongInLocalStorage, saveCurrentSongIndexInLocalStorage} from "../../utils"
import {message} from "../common/message"

export default (state, action) => {
    switch (action.type) {
        case audioController.TOGGLE_SONG_LIST_WINDOW: {
            return {
                ...state,
                showSongListWindow: !state.showSongListWindow,
            }
        }
        case audioController.CHANGE_AUDIO_STATUS: {
            return {
                ...state,
                AudioStatus: action.status
            }
        }
        case audioController.APPEND_THE_SONG: {
            let songList = state['songList']
            let cloneList = JSON.parse(JSON.stringify(songList))
            let isTheSongNotExisted = songList.every((value) => value.id !== action.songInfo.id)
            if (isTheSongNotExisted) {
                cloneList.push(action.songInfo)
                saveSongToLocalStorage(action.songInfo)
                message.success('添加成功', 2000)
            } else {

                message.warning('歌曲已存在', 2000)
            }
            return {
                ...state,
                songList: cloneList,
            }
        }
        case audioController.DELETE_THE_SONG: {
            let songList = state['songList']
            let cloneList = JSON.parse(JSON.stringify(songList))
            let deleteSongIndex = action.songIndex
            let currentSongIndex = state.currentSongExtraInfo.currentSongIndex
            let listLength = cloneList.length
            deleteSongInLocalStorage(deleteSongIndex)
            cloneList.splice(deleteSongIndex, 1)
            let justOneSong = listLength === 1
            let isCurrentSong = currentSongIndex === deleteSongIndex
            let isTheLastSong = currentSongIndex === listLength - 1
            let beforeCurrentSong = currentSongIndex < deleteSongIndex
            let updateCurrentSongIndex = -1
            let updateCurrentLyric = state.currentSongExtraInfo.currentLyric
            if (justOneSong) {
                updateCurrentSongIndex = -1
            } else if (isCurrentSong) {
                if (isTheLastSong) {
                    updateCurrentSongIndex = currentSongIndex - 1
                } else {
                    updateCurrentSongIndex = currentSongIndex
                }
                updateCurrentLyric = []
            } else {
                if (beforeCurrentSong) {
                    updateCurrentSongIndex = currentSongIndex
                } else {
                    updateCurrentSongIndex = currentSongIndex -1
                }
            }
            saveCurrentSongIndexInLocalStorage(updateCurrentSongIndex)
            return {
                ...state,
                songList: cloneList,
                currentSongExtraInfo: {
                    ...state.currentSongExtraInfo,
                    currentLyric: updateCurrentLyric,
                    currentSongIndex: updateCurrentSongIndex,
                }
            }
        }
        case audioController.PLAY_THE_SONG_IN_PAGE: {
            let songList = state['songList']
            let cloneList = JSON.parse(JSON.stringify(songList))
            let updateCurrentSongIndex = songList.findIndex((song) => song.id === action.songInfo.id)
            let isTheSongNotExisted = updateCurrentSongIndex === -1
            if (isTheSongNotExisted) {
                cloneList.push(action.songInfo)
                saveSongToLocalStorage(action.songInfo)
                updateCurrentSongIndex = cloneList.length - 1
            }
            saveCurrentSongIndexInLocalStorage(updateCurrentSongIndex)
            return {
                ...state,
                songList: cloneList,
                currentSongExtraInfo: {
                    ...state.currentSongExtraInfo,
                    currentSongIndex: updateCurrentSongIndex,
                    currentLyricIndex: -1,
                },
            }
        }
        case audioController.PLAY_THE_SONG_IN_LIST: {
            saveCurrentSongIndexInLocalStorage(action.songIndex)
            return {
                ...state,
                currentSongExtraInfo: {
                    ...state.currentSongExtraInfo,
                    currentSongIndex: action.songIndex,
                    currentLyricIndex: -1,
                    currentLyric: [],
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
            if (currentSongIndex === -1) {
                nextSongIndex = -1
            }
            let currentLyric = []
            if (nextSongIndex === currentSongIndex) {
                currentLyric = state.currentSongExtraInfo.currentLyric
            }
            saveCurrentSongIndexInLocalStorage(nextSongIndex)
            return {
                ...state,
                currentSongExtraInfo: {
                    ...state.currentSongExtraInfo,
                    currentSongIndex: nextSongIndex,
                    currentLyric,
                    currentLyricIndex: -1,
                },
            }
        }
        // case audioController.GET_SONG: {
        //     return {
        //         ...state,
        //         currentSongExtraInfo: {
        //             ...state.currentSongExtraInfo,
        //             url: action.url,
        //         }
        //     }
        // }
        case audioController.GET_LYRIC: {
            return {
                ...state,
                currentSongExtraInfo: {
                    ...state.currentSongExtraInfo,
                    currentLyric: action.lyric,
                },
            }
        }
        case audioController.GET_CURRENT_INDEX: {
            let index = action.currentLyricIndex
            if (index === undefined) {
                console.log('index undefined')
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