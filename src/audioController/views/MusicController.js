import React, {Component} from 'react'
import AudioController from "./AudioController"
import SongList from "./SongList"
import './MusicController.css'

class MusicController extends Component {

    render() {
        return (
            <div className="music-player">
                <AudioController />
                <SongList />
            </div>
        )
    }
}

export default MusicController