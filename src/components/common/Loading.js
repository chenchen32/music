import React from 'react'
import ReactDOM from "react-dom"

const Loading = () => {
    let container = document.querySelector('#loading-container')
    let icon = (
        <div className="loading-container">
            <svg className="load" viewBox="25 25 50 50">
                <circle className="loading" cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
        </div>
    )

    return ReactDOM.createPortal(icon, container)
}

export default Loading