import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {playListTagChange} from "../actions"

class TagItem extends Component {

    tagChange(value) {
        this.props.playListTagChange(value)
        this.props.toggleShow()
    }

    getClassName(value) {
        return this.props.activeTag === value ? "playlist-tag active-tag" : "playlist-tag"
    }

    render() {
        return (
            <div className="playlist-tag-tabs">
                {
                    this.props.theTagTabs.map((value, index) => (
                        <Link key={index} className={this.getClassName(value)} to={`/playlist?cat=${value}&page=1`} onClick={this.tagChange.bind(this, value)}>{value}</Link>
                    ))
                }
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

const mapDispatchTopProps = (dispatch) => {
    return {
        playListTagChange: (tagName) => {
            dispatch(playListTagChange(tagName))
        }
    }
}

export default connect(mapStateTopProps, mapDispatchTopProps)(TagItem)