import React, { Component } from 'react'
import PlayList from './PlayList'
import TagSelector from "./TagSelector"
import './playListPage.css'

class PlayListPage extends Component {

    render() {
        return (
            <div className="playlist-content">
                <TagSelector />
                <PlayList />
            </div>
        )
    }
}

export default PlayListPage
