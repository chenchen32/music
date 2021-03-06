import * as playList from './actionTypes.js'
import {MusicApi} from '../../api/api.js'

// 热门歌单标签切换
export const playListTagChange = (tagName) => ({
    type: playList.PLAYLIST_TAG_CHANGE,
    tagName
    })

// 开始加载歌单具体信息
export const loadItemDetailStarted = () => ({
    type: playList.LOAD_ITEM_DETAIL_STARTED,
})

// 加载歌单具体信息成功
export const loadItemDetailSuccess = (albumDetailInfo) => ({
    type: playList.LOAD_ITEM_DETAIL_SUCCESS,
    albumDetailInfo
})

// 删除歌单具体信息，即初始化模态弹窗
export const deleteItemDetail = () => {
    MusicApi.abortObj.albumDetail()
    return {
    type: playList.DELETE_ITEM_DETAIL,
    }
}

// 热门歌单列表开始加载
export const playListLoadStarted = () => ({
    type: playList.PLAYLIST_LOAD_STARTED,
})

// 热门歌单列表加载成功
export const playListLoadSuccess = (playListResult) => ({
    type: playList.PLAYLIST_LOAD_SUCCESS,
    playListResult,
})

// 热门歌单列表加载成功
export const playListLoadFailure = () => ({
    type: playList.PLAYLIST_LOAD_FAILURE,
})

export const playListPageChangePage = (page) => ({
    type: playList.PLAYLIST_PAGE_CHANGE,
    page,
})

export const albumChangePage = (page) => ({
    type: playList.ALBUM_PAGE_CHANGE,
    page,
})

// 异步加载热门歌单列表
export const fetchHotPlayList = (category="全部", page=1, pageSize=60, company='netease') => {
    return (dispatch) => {
        let queryObj = {
            category,
            pageSize,
            page,
            company,
        }
        dispatch(playListLoadStarted())
        let api = new MusicApi()
        api.hotPlayList(queryObj, (r) => {
            let playListResult = JSON.parse(r.response)
            console.log('加载热门歌单列表完成', playListResult)
            if (playListResult.code === 200) {
                dispatch(playListLoadSuccess(playListResult.data))
            } else {
                dispatch(playListLoadFailure())
            }
        })
    }
}

// 加载歌单具体信息
export const fetchAlbumDetailInfo = (albumId, company='netease') => {
    console.log('albumId', albumId)
    return (dispatch) => {
        let args = {
            albumId,
            company,
        }
        dispatch(loadItemDetailStarted())
        let api = new MusicApi()
        api.albumDetailInfo(args, (r) => {
            let playListResult = JSON.parse(r.response)
            console.log('加载歌单完成', playListResult)
            if (playListResult.code === 200) {
                dispatch(loadItemDetailSuccess(playListResult))
            } else {
                dispatch(playListLoadFailure())
            }
        })
    }
}