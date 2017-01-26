import React, {Component, PropTypes} from 'react';
import Tab from './tab';
import paths from '../constants/paths';

class TabPanel extends Component {
    constructor() {
        super();
        const _this = this;

        _this.onClickTab = _this.onClickTab.bind(_this);
    }

    onClickTab(path) {
        return () => {
            this.props.router.push(path);
        };
    }

    render() {

        const {props, onClickTab} = this;
        const {location} = props;

        return (
            <div>
                <header className="tab-panel">
                    <Tab title="Suppliers" onClick={onClickTab(paths.suppliers)} active={location.pathname === paths.suppliers}/>
                    <Tab title="Products" onClick={onClickTab(paths.products)} active={location.pathname === paths.products}/>
                    <Tab title="Orders" onClick={onClickTab(paths.orders)} active={location.pathname === paths.orders}/>
                </header>
                {props.children}
            </div>
        );
    }
}

TabPanel.propTypes = {
    children: PropTypes.node
};

export default TabPanel;
