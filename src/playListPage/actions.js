import * as playList from './actionTypes.js'

export const playListTagChange = (tagName) => ({
    type: playList.PLAYLIST_TAG_CHANGE,
    tagName
})

export const loadItemDetailStarted = () => ({
    type: playList.LOAD_ITEM_DETAIL_STARTED,
})

export const loadItemDetailSuccess = (albumDetailInfo) => ({
    type: playList.LOAD_ITEM_DETAIL_SUCCESS,
    albumDetailInfo
})

export const deleteItemDetail = () => ({
    type: playList.DELETE_ITEM_DETAIL,
})

export const playListLoadStarted = () => ({
    type: playList.PLAYLIST_LOAD_STARTED,
})

export const playListLoadSuccess = (playListResult) => ({
    type: playList.PLAYLIST_LOAD_SUCCESS,
    playListResult,
})

export const playListLoadFailure = () => ({
    type: playList.PLAYLIST_LOAD_FAILURE,
})

const _ajax = function(method, url, data, dispatch, startAction, callback) {
    let r = new XMLHttpRequest()
    r.open(method, url, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = () => {
        if (r.readyState === 4) {
            callback(r)
        }
    }
    r.send(null)
    dispatch(startAction)
}

export const fetchHotPlayList = (category="全部", page=1) => {
    let limit = 30
    let offset = (Number(page)- 1) * limit
    return (dispatch) => {
        let method = "GET"
        let url = `https://api.bzqll.com/music/netease/hotSongList?key=579621905&cat=${category}&limit=${limit}&offset=${offset}`
        // 如果需要源数据，加上 &isOrigin=1
        let startAction = playListLoadStarted()
        _ajax(method, url, category, dispatch, startAction, (r) => {
            let playListResult = JSON.parse(r.response)
            console.log('加载热门歌单列表完成', playListResult)
            if (playListResult.result === "SUCCESS") {
                dispatch(playListLoadSuccess(playListResult))
            } else {
                dispatch(playListLoadFailure())
            }
        })
    }
}

export const fetchAlbumDetailInfo = (AlbumId) => {
    console.log('AlbumId', AlbumId)
    return (dispatch) => {
        let method = "GET"
        let url = `https://api.bzqll.com/music/netease/songList?key=579621905&id=${AlbumId}`
        let data = ''
        let startAction = loadItemDetailStarted()
        _ajax(method, url, data, dispatch, startAction, (r) => {
            let playListResult = JSON.parse(r.response)
            console.log('加载歌单完成', playListResult)
            if (playListResult.result === "SUCCESS") {
                dispatch(loadItemDetailSuccess(playListResult))
            }
            // } else {
            //     dispatch(playListLoadFailure())
            // }
        })
    }
}