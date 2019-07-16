import * as search from './actionTypes.js'
import {MusicApi} from '../../api/api.js'

// 搜索框输入改变
export const inputChange = (input) => ({
    type: search.INPUT_CHANGE,
    input,
})

// 开始搜索
export const searchStarted = (data) => ({
    type: search.SEARCH_STARTED,
    data,
})

// 搜索成功
export const searchSuccess = (result, searchContent, searchPage) => ({
    type: search.SEARCH_SUCCESS,
    result,
    searchContent,
    searchPage,
})

// 搜索失败
export const searchFailure = (error) => ({
    type: search.SEARCH_FAILURE,
    error,
})

export const changePage = (page) => ({
    type: search.CHANGE_PAGE,
    page
})

// 拿到搜索数据
export const fetchSearchResult = (input, page=1, pageSize=20, company='netease') => {
    return (dispatch) => {
        let queryObj = {
            input,
            pageSize,
            page,
            company,
        }
        dispatch(searchStarted(input))
        let api = new MusicApi()
        api.searchResult(queryObj, (r) => {
            let searchResult = JSON.parse(r.response)
            console.log('搜索完成', searchResult)
            if (searchResult.code === 200) {
                dispatch(searchSuccess(searchResult, queryObj.input, page))
            } else {
                dispatch(searchFailure(searchResult))
            }
        })
    }
}