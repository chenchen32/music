import React, { Component } from 'react'
import {playListTagChange} from '../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import TagItem from './TagItem'
import {getSelectIcon} from './icon'

class TagSelector extends Component {
    constructor(props) {
        super(props)
        this.mainTags = ['语种', '风格', '场景', '情感', '主题']
        this.styleTags = ['流行', '摇滚', '民谣', '电子', '舞曲', '说唱', '轻音乐', '爵士', '乡村', 'R&B/Soul', '古典', '民族', '英伦', '金属', '朋克', '蓝调', '雷鬼', '拉丁', '古风', 'Bossa Nova']
        this.languageTags = ['华语', '欧美', '日语', '韩语', '粤语', '小语种']
        this.senceTags = ['清晨', '夜晚', '学习', '工作', '午休', '下午茶', '地铁', '驾车', '运动', '旅行', '散步', '酒吧']
        this.emotionTags = ['怀旧', '清新', '浪漫', '性感', '伤感', '治愈', '放松', '孤独', '感动', '兴奋', '快乐', '安静', '思念']
        this.themeTags = ['影视原声', 'ACG', '儿童', '校园', '游戏', '70后', '80后', '90后', '网络歌曲', 'KTV', '经典', '翻唱', '吉他', '钢琴', '器乐', '榜单', '00后']
        this.mapTagToMain = {
            '语种': this.languageTags,
            '风格': this.styleTags,
            '场景': this.senceTags,
            '情感': this.emotionTags,
            '主题': this.themeTags
        }
        this.state = {
            show: false
        }

        this.toggleShow = this.toggleShow.bind(this)
        this.hide = this.hide.bind(this)
        this.clickOnBlankArea = this.clickOnBlankArea.bind(this)
        document.onclick = this.hide
    }

    tagChange(value) {
        this.props.playListTagChange(value)
        this.toggleShow()
    }

    clickOnBlankArea(e) {
        e.nativeEvent.stopImmediatePropagation()
    }

    toggleShow(e) {
        this.setState((state) => ({
            show: !state.show,
        }))
        if (e !== undefined) {
            e.nativeEvent.stopImmediatePropagation()
        }
    }

    hide() {
        this.setState({
            show: false
        })
    }

    componentWillUnmount(){
        this.setState = () => {
            return false
        }
    //  防止组件卸载的时候调用 setState 导致 react 报错
    }

    render() {
        let classNameOfIcon = this.state.show ? "select-icon rotated" : "select-icon"
        let classNameOfTagsContainer = this.state.show ? "playlist-tags-container" : "playlist-tags-container hidden"
        let classNameOfMainTag = this.props.activeTag === '全部' ? "playlist-main-tag active-tag" : "playlist-main-tag"
        return (
            <div className="playlist-tags">
                <span className="active-tag-name" >{this.props.activeTag}</span>
                <span className="select-tag-button" onClick={this.toggleShow}>
                    {this.state.show ? '收起 ' : '展开 '}
                    {getSelectIcon(classNameOfIcon)}
                </span>
                <div className={classNameOfTagsContainer} onClick={this.clickOnBlankArea}>
                    <Link className={classNameOfMainTag}
                          to={{pathname: 'playlist', search: '?cat=全部&page=1'}}
                          onClick={this.tagChange.bind(this, '全部')}
                    >
                        全部
                    </Link>
                    {this.mainTags.map((value, index) => {
                        let theTagTabs = this.mapTagToMain[value]
                        return(
                            <div key={index} className="playlist-tag-container">
                                <div className="playlist-tag-class">{value}</div>
                                <TagItem theTagTabs={theTagTabs} toggleShow={this.toggleShow}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateTopProps = (state) => {
    let theState = state.PlayListReducer
    return {
        activeTag: theState.activeTag
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        playListTagChange: (tagName) => {
            dispatch(playListTagChange(tagName))
        },
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(TagSelector)