import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import './ToolbarButton/Table.css'
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'


function rowClassNameFormat(row, rowIdx) {
    return rowIdx % 2 === 0 ? 'Gold-Row' : 'Silver-Row';
}
 
const SimpleUserTable = props => (<div>
    <BootstrapTable data={props.data} trClassName={rowClassNameFormat}>
        <TableHeaderColumn isKey dataField='id'></TableHeaderColumn>
        <TableHeaderColumn dataField='name'></TableHeaderColumn>
        <TableHeaderColumn dataField='number' > </TableHeaderColumn>
        <TableHeaderColumn dataField='email'></TableHeaderColumn>
    </BootstrapTable>
    <p>{props.isFetching ? 'Fetching users...' : ''}</p>
</div>);

export default SimpleUserTable
