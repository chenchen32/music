import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {deleteItemDetail} from '../actions'
import * as Status from '../status'
import {loadingIcon} from '../../common/icon'
import AlbumDetail from './AlbumDetail'

class ModalPortal extends Component {
    constructor(props) {
        super(props)

        this.deleteDetailInfo = this.deleteDetailInfo.bind(this)
        this.container = document.querySelector('#pop-container')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let body = document.body
        if (this.props.albumStatus !== Status.INIT) {
            body.classList.add('ban-scroll')
        } else {
            body.classList.remove('ban-scroll')
        }
    }
    deleteDetailInfo() {
        this.props.deleteItemDetail()
    }

    showAlbumList() {
        switch (this.props.albumStatus) {
            case Status.INIT: {
                return null
            }
            case Status.LOADING: {
                return (
                    <div className="pop-up">
                        <div className="pop-window">
                            <span className="modal-portal-toggle" onClick={this.deleteDetailInfo}>×</span>
                            <div className="loading-container">
                                {loadingIcon}
                            </div>
                        </div>
                    </div>
                )
            }
            case Status.SUCCESS: {
                return (
                    <div className="pop-up">
                        <div className="pop-window">
                            <span className="modal-portal-toggle" onClick={this.deleteDetailInfo}>×</span>
                            <AlbumDetail />
                        </div>
                    </div>
                )
            }
            default: {
                return null
            }
        }
    }

    render() {
        return ReactDOM.createPortal(this.showAlbumList(), this.container)
    }
}

const mapStateToProps = (state) => {
    let theState = state.PlayListReducer
    return {
        albumStatus: theState.albumStatus,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItemDetail: () => {
            dispatch(deleteItemDetail())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPortal)