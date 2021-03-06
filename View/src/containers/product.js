import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {toggleBoolean} from '../actions';
import ProfileContent from '../components/profile-content';

class Product extends Component {
    constructor() {
        super();

        this.state = {text: 'Product'};

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(event) {
        this.setState({text: event.target.value});
    }

    onClick() {
        this.props.toggleBoolean();
    }

    render() {
        const {profile} = this.props;
        const {text} = this.state;

        return (
            <ProfileContent
                isOk={profile.isOk}
                onChange={this.onChange}
                title={text}
                toggleBoolean={this.onClick}
            />
        );
    }
}

Product.propTypes = {
    profile: PropTypes.object.isRequired,
    toggleBoolean: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({profile: state.profile});

export default connect(mapStateToProps, {toggleBoolean})(Product);
