import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {toggleBoolean, changeText} from '../actions';
import ProfileContent from '../components/profile-content';

class Order extends Component {
    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(event) {
        this.props.changeText(event.target.value);
    }

    onClick() {
        this.props.toggleBoolean();
    }


    componentWillReceiveProps(nextProps) {
        this.state = {
            text: nextProps.text
        }
    }

    render() {
        const {profile} = this.props;

        return (
            <ProfileContent
                isOk={profile.isOk}
                onChange={this.onChange}
                title={profile.text}
                toggleBoolean={this.onClick}
            />
        );
    }
}

Order.propTypes = {
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({profile: state.profile});

export default connect(mapStateToProps, {toggleBoolean, changeText})(Order);
