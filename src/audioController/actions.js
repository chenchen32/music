import * as audioController from './actionTypes'

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
        type: audioController.GET_CURRENT_TIME,
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

export const getLyric = (lyric) => {
    return {
        type: audioController.GET_LYRIC,
        lyric,
    }
}

const _ajax = function(method, url, dispatch, callback) {
    let r = new XMLHttpRequest()
    r.open(method, url, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = () => {
        if (r.readyState === 4) {
            callback(r)
        }
    }
    r.send(null)
}

const parseLyric = (lyricsArray) => {
    let result = []
    for (let i = 0; i < lyricsArray.length; i++) {
        let oneLyricString = lyricsArray[i]
        let oneLyric = ''
        let time = -1
        for (let j = 0; j < oneLyricString.length; j++) {
            let e = oneLyricString[j]
            if (e === ']') {
                oneLyric = oneLyricString.slice(j + 1)
                let timeList = oneLyricString.slice(1, j).split(':')
                time = Number(timeList[0]) * 60 + Number(timeList[1])
                break
            }
        }
        if (!isNaN(time)) {
            if (oneLyric === '') {
                oneLyric = '...'
            }
            let lyricItem = [
                time,
                oneLyric,
            ]
            result.push((lyricItem))
        }
    }
    return result
}

export const getLyricFromNet = (lrcUrl) => {
    return (dispatch) => {
        let method = 'GET'
        let url = lrcUrl
        _ajax(method, url, dispatch, (r) => {
            let l = r.response
            let lyricList = l.split('\n').slice(0, -1)
            if (lyricList.length === 0) {
                lyricList = [l]
            }
            console.log('解析歌词开始')
            let result = parseLyric(lyricList)
            console.log('解析歌词结束')
            dispatch(getLyric(result))
        })
    }
}