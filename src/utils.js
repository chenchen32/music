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

export const parseLyric = (lyricsArray) => {
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