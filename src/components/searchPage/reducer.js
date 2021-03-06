import * as search from './actionTypes.js'
import * as Status from './status.js'

export default (state, action) => {
    switch (action.type) {
        case search.INPUT_CHANGE: {
            return {
                ...state,
                searchInput: action.input
            }
        }
        case search.SEARCH_STARTED: {
            return {
                ...state,
                status: Status.LOADING
            }
        }
        case search.SEARCH_SUCCESS: {
            return {
                ...state,
                status: Status.SUCCESS,
                searchResult: action.result,
                searchContent: action.searchContent,
                searchPage: action.searchPage,
            }
        }
        case search.SEARCH_FAILURE: {
            return {
                status: Status.FAILURE
            }
        }
        case search.CHANGE_PAGE: {
            return {
                ...state,
                searchPage: action.page,
            }
        }
        default: {
            return state === undefined ? [] : state
        }
    }
}