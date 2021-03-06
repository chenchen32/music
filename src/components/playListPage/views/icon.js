import React from "react"

const getSelectIcon = (className) => (
    <svg className={className} viewBox="0 0 1024 1024">
        <path d="M127.5 330.9l0.7-0.7c12.3-12.3 32.4-12.3 44.7 0l339.9 339.9L853 330c12.5-12.5 32.9-12.5 45.4 0s12.5 32.9 0 45.4L536 737.8s-0.1 0.1-0.1 0.2l-0.7 0.7c-12.3 12.3-32.4 12.3-44.7 0l-363-363c-12.3-12.4-12.3-32.5 0-44.8z">
        </path>
    </svg>
)

export {
    getSelectIcon,
}