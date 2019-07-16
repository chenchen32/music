import * as homePage from './actionTypes'
import {MusicApi} from '../../api/api.js'

export const getImgInHomePage = (imgObj) => ({
    type: homePage.GET_HOMEPAGE_IMG,
    imgObj,
})

export const changeTheIndexOfImg = (index) => ({
    type: homePage.CHANGE_THE_INDEX_OF_IMG,
    index,
})

export const fetchImgInHomePage = () => {
    return (dispatch) => {
        let api = new MusicApi()
        api.getImgInHomePage((r) => {
            let imgObj = JSON.parse(r.response).data
            dispatch(getImgInHomePage(imgObj))
            console.log('轮播图信息', imgObj)
        })
    }
}