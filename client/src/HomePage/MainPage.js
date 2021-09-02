import React, { useEffect, useState } from 'react';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Typography,
    TablePagination,
    TableFooter,
    makeStyles,
 } from '@material-ui/core';
import EditButton from '../components/EditButton';
import DeleteButton from '../components/DeleteButton';
import Header from '../components/Header';

import employeeService from '../services/EmployeeService';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        borderRadius: 5,
        margin: '10px 0px',
        // maxWidth: 1650
        width: '80vw',
        height: '80vh'
    },
    tableHeaderCell: {
        // height: '20%',
        fontWeight: 'bold',
        backgroundColor: theme.palette.info.light,
        color: theme.palette.getContrastText(theme.palette.info.light)
    },
    tableActionsHeaderCell: {
        textAlign: 'center'
    },
    name: {
        fontWeight: 'bold',
        // color: theme.palette.secondary.main
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
}));

const MainPage = () => {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);

    const classes = useStyles();

    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(0);
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await employeeService.list();
                if(!response)
                    return;

                setEmployees(response.data);
                console.log(employees);
            }catch(e){
                console.log(e);
            }
        }
        fetchData();
    },[]);

    return (
        <div>
            <Header className={classes.header} setEmployees={setEmployees}/>
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
                    {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.name}>
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
                                <Typography color="primary" variant="subtitle2"
                                >{new Date(row.created_at).toLocaleDateString()}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="primary" variant="subtitle2"
                                >{row.salary}$</Typography>
                            </TableCell>
                            <TableCell>
                                <Grid container>
                                    <Grid lg={6}>
                                        <EditButton id={row._id}/>
                                    </Grid>
                                    <Grid>
                                        <DeleteButton id={row._id}/>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[7]}
                            // component="div"
                            count={employees.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={(e, value) => setPage(value)}
                            onChangeRowsPerPage={e => handleChangeRowsPerPage(e.target.value)}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MainPage;