import React, { Component } from 'react'
import PlayList from './PlayList'
import TagSelector from './TagSelector'
import ModalPortal from './ModalPortal'
import './playListPage.css'

class PlayListPage extends Component {

    render() {
        return (
            <div className="playlist-content">
                <TagSelector />
                <PlayList />
                <ModalPortal />
            </div>
        )
    }
}

export default PlayListPage
