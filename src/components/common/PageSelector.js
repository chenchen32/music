import React, {Component} from 'react'
import './common.css'

class PageSelector extends Component {
    constructor(props) {
        super(props)

        this.handleChangePage = this.handleChangePage.bind(this)
        this.isPreviousAndNextCanBeClicked = this.isPreviousAndNextCanBeClicked.bind(this)
    }

    static getPageSelector (endPage, currentPage, totalTagCount) {
        if (endPage <= totalTagCount) {
            let result = []
            for (let i = 1; i <= endPage; i++) {
                result.push(i)
            }
            return result
        }
        let list = []
        let lastList = []
        let startList = []
        let changingTagCount = totalTagCount - 3
        let start = currentPage - changingTagCount/ 2
        let end = currentPage + changingTagCount / 2
        for (let i = start; i <= end; i++) {
            if (i <= 1) {
                lastList.push(changingTagCount + i + 1)
            } else if (i >= endPage) {
                startList.push(i - changingTagCount - 1)
            } else {
                list.push(i)
            }
        }
        let result = [...startList,...list,...lastList]
        if (result[0] !== 2) {
            result.unshift('...')
        }
        if (result[result.length - 1] < endPage - 1) {
            result.push('...')
        }
        result = [1, ...result, endPage]
        return result
    }

    showMiddleTag() {
        let {totalPage, currentPage} = {...this.props.selectorInfo}
        if (totalPage === 0) {
            return
        }
        let pageList = PageSelector.getPageSelector(totalPage, currentPage, 9)
        return pageList.map((page, index) => {
            if (page === '...') {
                return (
                    <span className="page-selector-ellipsis" key={index}>...</span>
                )
            } else if (page === currentPage) {
                return (
                    <button className="page-selector-current page-selector-tag page-btn" key={index}>{page}</button>
                )
            } else {
                return (
                    <button className="page-selector-tag page-btn" key={index} onClick={this.handleChangePage(page)}>{page}</button>
                )
            }
        })
    }

    handleChangePage(page) {
        return () => {
            this.props.changePage(page)
            if (this.props.pushHistory) {
                this.props.pushHistory(page)
            }
        }
    }

    isPreviousAndNextCanBeClicked() {
        let {totalPage, currentPage} = {...this.props.selectorInfo}
        let previousCanNotBeClicked = false
        let nextCanNotBeClicked = false
        if (totalPage === 1) {
            previousCanNotBeClicked = true
            nextCanNotBeClicked = true
        }
        if (currentPage === 1) {
            previousCanNotBeClicked = true
        } else if (currentPage === totalPage) {
            nextCanNotBeClicked = true
        }
        let previousClassName = previousCanNotBeClicked ? 'previous-ban-click' : 'previous-can-click'
        let nextClassName = nextCanNotBeClicked ? 'next-ban-click' : 'next-can-click'
        return {
            previousCanNotBeClicked,
            nextCanNotBeClicked,
            previousClassName,
            nextClassName,
        }
    }

    render() {
        let {currentPage} = {...this.props.selectorInfo}
        let previousAndNext = this.isPreviousAndNextCanBeClicked()
        let {previousCanNotBeClicked, nextCanNotBeClicked, previousClassName, nextClassName} = {...previousAndNext}
        return (
            <div className="page-selector">
                <button className={`${previousClassName} page-btn`} disabled={previousCanNotBeClicked} onClick={this.handleChangePage(currentPage - 1)}>&lt;</button>
                {this.showMiddleTag()}
                <button className={`${nextClassName} page-btn`} disabled={nextCanNotBeClicked} onClick={this.handleChangePage(currentPage + 1)}>&gt;</button>
            </div>
        )
    }
}

export default PageSelector