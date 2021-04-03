import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ErrorMessage extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
        }
    }

    display = () => {
        this.setState({visible: true})
    }

    hide = () => {
        this.setState({visible: false})
    }

    render() {
        if (!this.state.visible) {
            return null
        }

        return (
            <p className={this.props.styles}>
                {this.props.message}
            </p>                
        )
    }
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    styles: PropTypes.string.isRequired,
}

export default ErrorMessage;
