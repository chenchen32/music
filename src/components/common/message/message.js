import React from 'react'
import ReactDOM from 'react-dom'
import MessageList from './views/MessageList'

const createNotification = () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const notification = ReactDOM.render(<MessageList />, div)
    return {
        addMessage(message) {
            return notification.addMessage(message)
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        }
    }
}

let notification
const message = (type, content, duration = 2000, onClose) => {
    if (!notification) {
        notification = createNotification()
    }
    return notification.addMessage({ type, content, duration, onClose })
}

export default {
    info(content, duration, onClose) {
        return message('info', content, duration, onClose)
    },
    success(content, duration, onClose) {
        return message('success', content, duration, onClose)
    },
    warning(content, duration, onClose) {
        return message('warning', content, duration, onClose)
    },
    error(content, duration, onClose) {
        return message('error', content, duration, onClose)
    },
    loading(content, duration = 0, onClose) {
        return message('loading', content, duration, onClose)
    }
}
