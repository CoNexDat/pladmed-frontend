import {
    Button,
    Spinner
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function ButtonLoad(props) {
    const {loading, ...buttonProps} = props;

    return (
        <Button
            {...buttonProps}
        >
            {loading && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />}
            {props.children}
        </Button>
    )
}

ButtonLoad.propTypes = {
    loading: PropTypes.bool.isRequired
}

export default ButtonLoad;
