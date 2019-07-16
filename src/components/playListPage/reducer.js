import * as playList from './actionTypes.js'
import * as Status from './status.js'

export default (state, action) => {
    switch (action.type) {
        case playList.PLAYLIST_TAG_CHANGE: {
            return {
                ...state,
                activeTag: action.tagName,
                currentPage: 1,
            }
        }
        case playList.LOAD_ITEM_DETAIL_STARTED: {
            return {
                ...state,
                albumStatus: Status.LOADING
            }
        }
        case playList.LOAD_ITEM_DETAIL_SUCCESS: {
            return {
                ...state,
                albumStatus: Status.SUCCESS,
                albumDetailInfo: action.albumDetailInfo
            }
        }
        case playList.DELETE_ITEM_DETAIL: {
            return{
                ...state,
                albumStatus: '',
                albumDetailInfo: '',
                albumCurrentPage: 1,
            }
        }
        case playList.PLAYLIST_LOAD_STARTED: {
            return {
                ...state,
                playListStatus: Status.LOADING
            }
        }
        case playList.PLAYLIST_LOAD_SUCCESS: {
            return {
                ...state,
                playListStatus: Status.SUCCESS,
                playListResult: action.playListResult
            }
        }
        case playList.PLAYLIST_LOAD_FAILURE: {
            return {
                ...state,
                playListStatus: Status.FAILURE
            }
        }
        case playList.PLAYLIST_PAGE_CHANGE: {
            return {
                ...state,
                currentPage: action.page,
            }
        }
        case playList.ALBUM_PAGE_CHANGE: {
            return {
                ...state,
                albumCurrentPage: action.page,
            }
        }
        default: {
            return state === undefined ? {} : state
        }
    }
}