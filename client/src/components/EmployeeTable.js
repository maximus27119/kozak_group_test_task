import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
  makeStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { useHistory } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../asyncActions/employees';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    borderRadius: 5,
    margin: '10px 0px',
    // maxWidth: 1650
    width: '80vw',
    height: '80vh'
  },
  tableActionsHeaderCell: {
    textAlign: 'center'
  },
  name: {
    fontWeight: 'bold'
  }
}));

const EmployeeTable = (props) => {
  const employees = useSelector(state => state.employee);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();  

  const handleEdit = id => {
    history.push(`/edit_employee/${id}`);
  };

  const handleDelete = id => {
    dispatch(deleteEmployee(id));
  }

  useEffect(() => {
    dispatch(getEmployees());
  },[]);

  return (
    <div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table">
          <TableHead>                    
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Full Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>Gender</TableCell>
              <TableCell className={classes.tableHeaderCell}>Contacts</TableCell>
              <TableCell className={classes.tableHeaderCell}>Job Info</TableCell>
              <TableCell className={classes.tableHeaderCell}>Joining Date</TableCell>
              <TableCell className={classes.tableHeaderCell}>Salary</TableCell>
              <TableCell className={classes.tableHeaderCell}><p className={classes.tableActionsHeaderCell}>Actions</p></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {employees.employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row._id}>
            {console.log(row)}
              <TableCell>
                <Grid container>
                  <Grid>
                    <Typography className={classes.name}>{row.fullname}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Typography color="primary" variant="subtitle2">{row.gender}</Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="body2">{row.contacts}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">{row.position}</Typography>
              </TableCell>
              <TableCell>
                <Typography color="primary" variant="subtitle2">
                {new Date(row.created_at).toLocaleDateString()}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="primary" variant="subtitle2">
                {row.salary}$
                </Typography>
              </TableCell>
              <TableCell>
                <Grid container>
                  <Grid lg={6}>
                    <Button color="primary" onClick={e => handleEdit(row._id)}><EditIcon/></Button>
                  </Grid>
                  <Grid>
                    <Button color="secondary" onClick={e => handleDelete(row._id)}><DeleteForeverIcon/></Button>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[rowsPerPage]}
              // component="div"
              count={employees.employees.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, value) => setPage(value)}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeTable;