import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';

import paths from './constants/paths';

import TabPanel from './components/tab-panel';
import Supplier from './containers/supplier';
import Product from './containers/product';
import Order from './containers/order';

import reducers from './reducers';

import './styles/style.scss';

const store = createStore(reducers, applyMiddleware(thunk));

render(<Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={TabPanel}>
            <Route path={paths.suppliers} component={Supplier}/>
            <Route path={paths.products} component={Product}/>
            <Route path={paths.orders} component={Order}/>
        </Route>
    </Router>
</Provider>, document.querySelector('#app'));
