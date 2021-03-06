import * as audioController from './actionTypes'
import {MusicApi} from '../../api/api.js'
import {parseLyricArray} from '../../utils'

export  const toggleSongListWindow = () => {
    return {
        type: audioController.TOGGLE_SONG_LIST_WINDOW,
    }
}

export const changeAudioStatus = (status) => {
    return {
        type: audioController.CHANGE_AUDIO_STATUS,
        status
    }
}

export const changePlayMode = (modeType) => {
    return {
        type: audioController.CHANGE_PLAY_MODE,
        modeType,
    }
}

export const saveCurrentLyricIndex = (currentLyricIndex) => {
    return {
        type: audioController.GET_CURRENT_INDEX,
        currentLyricIndex,
    }
}

export const appendTheSong = (songInfo) => {
    return {
        type: audioController.APPEND_THE_SONG,
        songInfo,
    }
}

export const deleteTheSong = (songIndex) => {
    return {
        type: audioController.DELETE_THE_SONG,
        songIndex,
    }
}

export const playTheSongInPage = (songInfo) => {
    return {
        type: audioController.PLAY_THE_SONG_IN_PAGE,
        songInfo,
    }
}

export const playTheSongInList = (songIndex) => {
    return {
        type: audioController.PLAY_THE_SONG_IN_LIST,
        songIndex,
    }
}

export const playNextSong = (modeType, loopStep=1) => {
    return {
        type: audioController.PLAY_NEXT_SONG,
        modeType,
        loopStep,
    }
}

// export const getSong = (songUrl) => ({
//     type: audioController.GET_SONG,
//     songUrl,
// })

export const getLyric = (lyric) => {
    return {
        type: audioController.GET_LYRIC,
        lyric,
    }
}

// export const getSongUrlFromNet = (url) => {
//     return (dispatch) => {
//         let api = new MusicApi()
//         api.getSong(url, (r) => {
//             let songUrl = JSON.parse(r.response).data
//             dispatch(getSong(songUrl))
//         })
//     }
// }

export const getLyricFromNet = (lrcUrl) => {
    return (dispatch) => {
        let api = new MusicApi()
        api.getLyric(lrcUrl, (r) => {
            let l = r.response
            console.log(lrcUrl)
            let lyricList = l.split('\n').slice(0, -1)
            if (lyricList.length === 0) {
                lyricList = [l]
            }
            let result = parseLyricArray(lyricList)
            dispatch(getLyric(result))
        })
    }
}