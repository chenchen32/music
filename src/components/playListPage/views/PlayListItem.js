import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAlbumDetailInfo} from '../actions'

class PlayListItem extends Component {
    constructor(props) {
        super(props)
        this.itemInfo = this.props.itemInfo
        // this.getAlbumInfo = this.getAlbumInfo.bind(this)
    }

    parseImgUrl(url) {
        let list = url.split('?')
        let urlChanged = `${list[0]}?param=400y400`
        return urlChanged
    }

    // getAlbumInfo(AlbumId) {
    //     return () => {this.props.fetchAlbumDetailInfo(AlbumId)}
    // }

    render() {
        let {id, title, coverImgUrl} = {...this.itemInfo}
        let coverThumbImgUrl = this.parseImgUrl(coverImgUrl)
        return (
            <div className="album-container">
                <div className="album-img" data-id={id} onClick={this.props.fetchAlbumDetailInfo.bind(this, id)}>
                    <img src={coverThumbImgUrl} alt="歌单封面"/>
                </div>
                <div className="album-info" title={title}>
                    <span>{title}</span>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAlbumDetailInfo: (AlbumId) => {
            dispatch(fetchAlbumDetailInfo(AlbumId))
        }
    }
}

export default connect(null, mapDispatchToProps)(PlayListItem)