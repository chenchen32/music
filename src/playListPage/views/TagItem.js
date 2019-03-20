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

    getTagTable(i) {
        let rowData = this.props.theTagTabs.slice(i, i + 6)
        return (
            <tbody key={i}>
                <tr>
                    {rowData.map((value, index) => {
                        return (
                            <td key={index} className={this.getClassName(value)}>
                                <Link  to={`/playlist?cat=${value}`} onClick={this.tagChange.bind(this, value)}>{value}</Link>
                            </td>
                        )
                    })}
                </tr>
            </tbody>
         )
    }

    render() {
        return (
            <div className="playlist-tag-tabs">
                {this.props.theTagTabs.map((value, index) => {
                    return (
                            <Link key={index} className={this.getClassName(value)} to={`/playlist?cat=${value}`} onClick={this.tagChange.bind(this, value)}>{value}</Link>
                    )
                })}
                {/*{this.props.theTagTabs.map((value, index) => {*/}
                    {/*if (index % 6 === 0) {*/}
                        {/*return this.getTagTable(index)*/}
                    {/*} else {*/}
                        {/*return false*/}
                    {/*}*/}
                {/*})}*/}
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