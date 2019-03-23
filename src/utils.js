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