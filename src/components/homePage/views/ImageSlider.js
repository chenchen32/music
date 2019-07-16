import React, { Component } from "react"
import {connect} from 'react-redux'
import {fetchImgInHomePage, changeTheIndexOfImg} from '../actions'

class ImageSlider extends Component {
    constructor(props) {
        super(props)

        this.handlerNextImage = this.handlerNextImage.bind(this)
        this.autoPlay = this.autoPlay.bind(this)
        this.stopAutoPlay = this.stopAutoPlay.bind(this)
        this.handlerClickPoint = this.handlerClickPoint.bind(this)
    }

    componentDidMount() {
        if (this.props.images.length === 0) {
            this.props.fetchImgInHomePage()
        }
        this.autoPlay()
    }

    componentWillUnmount() {
        this.stopAutoPlay()
    }

    playNextImage(step) {
        let lengthOfImages = this.props.images.length
        let indexOfNextImg = (this.props.indexOfCurrentImg + step + lengthOfImages) % lengthOfImages
        this.props.changeTheIndexOfImg(indexOfNextImg)
    }

    handlerNextImage(event) {
        let step = Number(event.target.dataset.step)
        this.playNextImage(step)
    }

    autoPlay() {
        this.timerID = setInterval(() => {
            this.playNextImage(1)
        }, 5000)
    }

    stopAutoPlay() {
        clearInterval(this.timerID)
    }

    getClassNameOfPoints(index) {
        return index === this.props.indexOfCurrentImg? 'slide-point active-point' : 'slide-point'
    }

    handlerClickPoint(event) {
        let index = Number(event.target.dataset.index)
        this.props.changeTheIndexOfImg(index)
    }

    render() {
        let widthOfImg = 730
        let heightOfSlider = 336
        let images = this.props.images || []
        let widthOfSlider = images.length * widthOfImg
        let offset = -(this.props.indexOfCurrentImg % widthOfSlider) * widthOfImg || 0
        return(
            <div className='image-slider' onMouseOver={this.stopAutoPlay} onMouseOut={this.autoPlay}>
                <button className='slide-button slide-left vertical-center' onClick={this.handlerNextImage} data-step="-1">&lt;</button>
                {/*<div className='image-slider-container' style={{width: widthOfSlider, height: heightOfSlider, left: offset}}>*/}
                <div className='image-slider-container' style={{width: widthOfSlider, height: heightOfSlider, transform: `translate3d(${offset}px, 0px, 0px)`}}>
                    {
                        images.map((value, index) => {
                            return (
                                <img key={index} src={value.picUrl} alt="轮播图" />
                            )
                        })
                    }
                </div>
                <button className='slide-button slide-right vertical-center' onClick={this.handlerNextImage} data-step="1">&gt;</button>
                <div className='slide-point-container'>
                    {
                        images.map((value, index) => {
                            return (
                                <span className={this.getClassNameOfPoints(index)} key={index} data-index={index} onClick={this.handlerClickPoint}> </span>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let theState = state.homePageReducer
    return {
        images: theState.images,
        indexOfCurrentImg: theState.indexOfCurrentImg,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchImgInHomePage: () => {
            dispatch(fetchImgInHomePage())
        },
        changeTheIndexOfImg: (index) => {
            dispatch(changeTheIndexOfImg(index))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageSlider)