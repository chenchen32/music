import React, {Component} from 'react'
import {changeImgResolution, parseClass} from '../../../utils'
import {SearchItem} from '../../searchPage'
import PageSelector from '../../common/PageSelector'
import {albumChangePage} from '../actions'
import {connect} from 'react-redux'

class AlbumDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAllDescriptionShowed: false,
        }

        this.descriptionToggle = this.descriptionToggle.bind(this)
        this.getPageSelectorInfo = this.getPageSelectorInfo.bind(this)
    }

    descriptionToggle() {
        this.setState((state) => ({
            isAllDescriptionShowed: !state.isAllDescriptionShowed,
        }))
    }

    static dataCleaning(fetchedData) {
        let singerList = fetchedData.artists.map(artist => artist.name)
        let singer = singerList.join('/')
        return {
            id: fetchedData.id,
            name: fetchedData.name,
            singer,
            time: fetchedData.duration / 1000,
            pic: fetchedData.album.blurPicUrl,
            lrc: `https://v1.itooi.cn/netease/lrc?id=${fetchedData.id}`,
            url: `https://v1.itooi.cn/netease/url?id=${fetchedData.id}`,
            // copyright: fetchedData.privilege.fl !== 0,
            copyright: true,
        }
    }

    getPageSelectorInfo() {
        let totalPage = Math.ceil(this.props.albumDetailInfo.data.trackCount / this.props.albumPageSize)
        return {
            totalPage,
            currentPage: Number(this.props.albumCurrentPage),
        }
    }

    render() {
        let data = this.props.albumDetailInfo.data
        let {coverImgUrl, name, description, trackCount} = data
        coverImgUrl = changeImgResolution(coverImgUrl, 200)

        let {albumCurrentPage, albumPageSize} = {...this.props}
        let start = (albumCurrentPage - 1) * albumPageSize
        let end = start + albumPageSize
        let dataOfShowedAlbums = data.tracks.slice(start, end)

        let {isAllDescriptionShowed} = this.state
        let classNameOfAlbumInfo = parseClass({
            'album-list-info': true,
            'all-description-showed': isAllDescriptionShowed,
        })
        let classNameOfDescription = parseClass({
            'album-list-description': true,
            'all-description-showed': isAllDescriptionShowed,
        })
        return (
            <div className="album-list-container">
                <div className={classNameOfAlbumInfo}>
                    <img className="album-list-bg" src={coverImgUrl} alt="专辑图片"/>
                    <span className="album-list-pic">
                                <img src={coverImgUrl} alt="专辑图片"/>
                            </span>
                    <div className="album-list-name" title={name}>
                        {`歌单：${name}`}
                    </div>
                    <p className={classNameOfDescription}>
                        <span>介绍：</span><br/>
                        {`${description}`}
                    </p>
                    <span className="description-toggle" onClick={this.descriptionToggle}>{isAllDescriptionShowed ? '收起' : '展开'}</span>
                </div>
                <div className="album-list-count">
                    {`歌曲列表 (${trackCount}首歌)`}
                </div>
                <div className="album-list-items">
                    {dataOfShowedAlbums.map((value, i) => {
                        let index = i + start
                        return <SearchItem key={index} index={index} result={AlbumDetail.dataCleaning(value)}/>
                    })}
                </div>
                <PageSelector selectorInfo={this.getPageSelectorInfo()} changePage={this.props.changePage} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let theState = state.PlayListReducer
    return {
        albumDetailInfo: theState.albumDetailInfo,
        albumCurrentPage: theState.albumCurrentPage,
        albumPageSize: theState.albumPageSize,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(albumChangePage(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetail)