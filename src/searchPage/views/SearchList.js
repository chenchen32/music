import React, {Component} from 'react'
import SearchItem from './SearchItem'
import {connect} from 'react-redux'

class SearchList extends Component {

    render() {
        let searchData = this.props.searchResult.data
        return(
            <div className="search-list-container">
                <span className="search-head-number">
                </span>
                <div className="search-head-container">
                    <div className="search-head-name name">
                        <span title="歌名">歌曲</span>
                    </div>
                    <div className="search-head-singer name">
                        <span title="歌手">歌手</span>
                    </div>
                    <div className="search-head-time">
                        时长
                    </div>
                </div>
                <div className="search-list">
                {searchData.map((value, index) => (
                    <SearchItem key={index} index={index} result={value}/>
                ))}
                </div>
            </div>
        )
    }
}

const mapStateTopProps = (state) => {
    let theState = state.SearchBarReducer
    return {
        searchResult: theState.searchResult
    }
}

export default connect(mapStateTopProps, null)(SearchList)