import * as homePage from './actionTypes.js'

export default (state, action) => {
    switch (action.type) {
        case homePage.GET_HOMEPAGE_IMG: {
            return {
                ...state,
                images: action.imgObj,
            }
        }
        case homePage.CHANGE_THE_INDEX_OF_IMG: {
            return {
                ...state,
                indexOfCurrentImg: action.index,
            }
        }

        default: {
            return state === undefined ? {} : state
        }
    }
}