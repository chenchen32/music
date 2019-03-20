import { applyMiddleware, createStore, combineReducers} from 'redux'
import {reducer as SearchBarReducer} from './searchPage/'
import {reducer as PlayListReducer} from './playListPage/'
import {reducer as AudioReducer} from './audioController/'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {loadSongListInLocalStorage} from './untils'

const initValue = {
    SearchBarReducer: {
        searchContent: ''
    },
    PlayListReducer: {
        activeTag: '全部',
        albumStatus: '',
        albumDetailInfo: '',
    },
    AudioReducer: {
        AudioStatus: 'pause',
        songList: loadSongListInLocalStorage(),
        currentSongExtraInfo: {
            currentSongIndex: -1,
            currentLyric: [],
            currentLyricIndex: -1,
        },
        playMode: 'loop',
        initSongInfo: {
            id: -1,
            name: '歌曲',
            singer: '歌手',
            lrc: null,
            pic: "http://s4.music.126.net/style/web2/img/default/default_album.jpg",
            url: null,
            time: null,
            shouldPlay: false,
        },
    },
}

const reducerObj = {
    SearchBarReducer,
    PlayListReducer,
    AudioReducer,
}

const reducer = combineReducers(reducerObj)

const middleware = [thunkMiddleware]

const storeEnhancers = composeWithDevTools(applyMiddleware(...middleware))

const Store = createStore(reducer, initValue, storeEnhancers)

export default Store