export const timeFormat = function(seconds) {
    if (!seconds) {
        return '00:00'
    }
    let m = String(Math.floor(seconds / 60))
    let s = String(Math.floor(seconds % 60))
    if (s.length === 1) {
        s = "0" + s
    }
    if (m.length === 1) {
        m = "0" + m
    }
    return `${m}:${s}`
}

export const timeDeFormat = (timeInfo) => {
    let timeList = timeInfo.split(':')
    let length = timeList.length
    let time = 0
    timeList.map((value, index) => {
        let exp = length - index - 1
        time += value * 60 ** exp
        return 0
    })
    return time
}

export const loadCurrentSongIndexInLocalStorage = () => {
    let currentSongIndex = JSON.parse(localStorage.getItem('currentSongIndex'))
    if (currentSongIndex === null) {
        currentSongIndex = -1
    }
    return currentSongIndex
}

export const saveCurrentSongIndexInLocalStorage = (index) => {
    localStorage.setItem('currentSongIndex', JSON.stringify(index))
}

export const loadSongListInLocalStorage = () => {
    let songList = JSON.parse(localStorage.getItem('songList'))
    if (songList === null) {
        songList = []
    }
    return songList
}

export const saveSongToLocalStorage = (songInfo) => {
    let songList = JSON.parse(localStorage.getItem('songList'))
    if (songList === null) {
        songList = []
    }
    songList.push(songInfo)
    localStorage.setItem('songList', JSON.stringify(songList))
}

export const deleteSongInLocalStorage = (songIndex) => {
    let songList = JSON.parse(localStorage.getItem('songList'))
    songList.splice(songIndex, 1)
    localStorage.setItem('songList', JSON.stringify(songList))
}

export const getCurrentSongInfo = (theState) => {
    let songList = theState.songList
    let currentSongIndex = theState.currentSongExtraInfo.currentSongIndex
    let currentSongInfo = {}
    if (currentSongIndex === -1) {
        currentSongInfo = theState.initSongInfo
    } else {
        currentSongInfo = songList[currentSongIndex]
    }
    return currentSongInfo
}

const clearTimeRepeat = (lyricList, repeatIndex, lyricBeforeTranslated) => {
    let result = lyricList
    let element = result[repeatIndex].lyric
    if (element === '...') {
        result[repeatIndex].lyric = lyricBeforeTranslated
    } else {
        result[repeatIndex].translatedLyric = element
        result[repeatIndex].lyric = lyricBeforeTranslated
    }
}

const parseLyric = (lyric) => {
    let oneLyricInfo = lyric
    let indexOfTime = oneLyricInfo.indexOf(']')
    let oneLyric = oneLyricInfo.slice(indexOfTime + 1)
    let timeInfo = oneLyricInfo.slice(1, indexOfTime)
    let time = timeDeFormat(timeInfo)
    return {
        oneLyric,
        time
    }
}

export const parseLyricArray = (lyricsArray) => {
    let result = []
    for (let i = 0; i < lyricsArray.length; i++) {
        let oneLyricInfo = lyricsArray[i]
        let {oneLyric, time} = parseLyric(oneLyricInfo)
        let repeatIndex = result.findIndex((theLyric) => {
            return theLyric.time === time
        })
        let isTimeRepeat = repeatIndex !== -1
        if (isTimeRepeat) {
            clearTimeRepeat(result, repeatIndex, oneLyric)
        } else {
            if (isNaN(time)) {
                continue
            }
            if (oneLyric === '') {
                oneLyric = '...'
            }
            let lyricItem = {
                time,
                lyric: oneLyric,
                translatedLyric: null,
            }
            result.push((lyricItem))
        }
    }
    result.sort((prev, current) => prev.time - current.time)
    return result
}

export const argsFromQuery = (query) => {
    if (query[0] === '?') {
        query = query.slice(1)
    }
    let o = {}
    if (query.length === 0) {
        return o
    }
    query.split('&').forEach(e => {
        let [k, v] = e.split('=')
        o[k] = v
    })
    return o
}

export const changeImgResolution = (url, pixel) => {
    let list = url.split('?')
    return `${list[0]}?param=${pixel}y${pixel}`
}