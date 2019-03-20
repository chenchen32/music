import * as search from './actionTypes.js'

export const inputChange = (input) => ({
    type: search.INPUT_CHANGE,
    input,
})

export const searchStarted = (data) => ({
    type: search.SEARCH_STARTED,
    data,
})

export const searchSuccess = (result, searchContent) => ({
    type: search.SEARCH_SUCCESS,
    result,
    searchContent,
})

export const searchFailure = (error) => ({
    type: search.SEARCH_FAILURE,
    error,
})

const _ajax = function(method, url, data, dispatch) {
    let r = new XMLHttpRequest()
    r.open(method, url, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = () => {
        if (r.readyState === 4) {
            let searchResult = JSON.parse(r.response)
            console.log('搜索完成', searchResult)
            if (searchResult.result === "SUCCESS") {
                dispatch(searchSuccess(searchResult, data))
            } else {
                dispatch(searchFailure(searchResult))
            }
        }
    }
    r.send(data)
    dispatch(searchStarted(data))
}

export const fetchSearchResult = (input, page=1) => {
    let limit = 20
    let offset = (Number(page)- 1) * limit
    return (dispatch) => {
        let method = "GET"
        let url = `https://api.bzqll.com/music/netease/search?key=579621905&s=${input}&type=song&limit=${limit}&offset=${offset}`
        // 如果需要源数据，加上 &isOrigin=1
        _ajax(method, url, input, dispatch)
    }
}