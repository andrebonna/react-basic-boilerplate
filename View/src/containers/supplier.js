import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactTable from 'react-table';

import {changeText} from '../actions';

class Supplier extends Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        const data = [{
            name: 'Any Supplier',
            contact: {
                name: 'Bason Maurer',
                number: '32243453635'
            }
        }, {
            name: 'Other Supplier',
            contact: {
                name: 'Aason Maurer',
                number: '98763453635'
            }
        }, {
            name: 'Some Supplier',
            contact: {
                name: 'Cason Maurer',
                number: '68763453635'
            }
        }];

        const columns = [{
            header: 'Name',
            accessor: 'name'
        }, {
            header: 'Contact',
            columns: [{
                header: 'Contact Name',
                accessor: 'contact.name'
            }, {
                header: 'Contact Number',
                accessor: 'contact.number'
            }]
        }];

        return (
            <ReactTable
                className="-striped -highlight"
                data={data}
                columns={columns}
                defaultPageSize="5"
            />
        );
    }
}

Supplier.propTypes = {};

const mapStateToProps = (state) => ({profile: state.profile});

export default connect(mapStateToProps, {changeText})(Supplier);
