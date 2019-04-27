import { applyMiddleware, createStore, combineReducers} from 'redux'
import {reducer as SearchBarReducer} from './components/searchPage/'
import {reducer as PlayListReducer} from './components/playListPage/'
import {reducer as AudioReducer} from './components/audioController/'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {loadSongListInLocalStorage} from './utils'

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