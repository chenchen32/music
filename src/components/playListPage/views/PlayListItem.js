import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAlbumDetailInfo} from '../actions'
import {changeImgResolution} from '../../../utils'

class PlayListItem extends Component {

    render() {
        let {id, name, coverImgUrl} = {...this.props.itemInfo}
        let coverThumbImgUrl = changeImgResolution(coverImgUrl, 400)
        return (
            <div className="album-container">
                <div className="album-img" data-id={id} onClick={this.props.fetchAlbumDetailInfo.bind(this, id)}>
                    <img src={coverThumbImgUrl} alt="歌单封面"/>
                </div>
                <div className="album-info" title={name}>
                    <span>{name}</span>
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