import React, {Component, Fragment} from "react"
import Message from './Message'
import './message.css'

class MessageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
        }
        this.removeMessage = this.removeMessage.bind(this)
    }

    getMessageKey() {
        const { messages } = this.state
        return `message-${new Date().getTime()}-${messages.length}`
    }

    addMessage(message) {
        const { messages } = this.state
        message.key = this.getMessageKey()
        messages.push(message)
        this.setState({
            messages: messages
        })
        setTimeout(() => {
            this.removeMessage(message.key)
        }, message.duration)
    }

    removeMessage(key) {
        this.setState(previousState => ({
            messages: previousState.messages.filter((message) => {
                if (message.key === key) {
                    if (message.onClose) {
                        message.onClose()
                    }
                    return false
                }
                return true
            })
        }))
    }


    render() {
        let {messages} = this.state
        return (
            <div className="message-list">
                {
                    messages.map((message) => (
                        <Fragment key={message.key}>
                            <Message {...message} />
                            <br/>
                        </Fragment>
                    ))
                }
            </div>
        )
    }
}

export default MessageList