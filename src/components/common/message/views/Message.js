import React, {Component} from "react"
import icons from './icons'

class Message extends Component {
    constructor(props) {
        super(props)
        this.mapTypeToIcon = {...icons}
    }
    render() {
        let {type, content} = this.props
        return (
            <div className={`message-container ${type}`}>
                {this.mapTypeToIcon[type]}
                <span className="message-content">{content}</span>
            </div>
        )
    }
}

export default Message