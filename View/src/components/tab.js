import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

class Tab extends Component {
    constructor() {
        super();
    }

    render() {
        const {title, onClick, active} = this.props;

        return (
            <div onClick={onClick} className={cx('tab', {
                active: active
            })}>
                <h3>{title}</h3>
            </div>
        );
    }
}

Tab.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    active: PropTypes.bool
};

Tab.defaultProps = {
    active: false
};

export default Tab;