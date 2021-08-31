import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
 } from '@material-ui/core';
import { EditButton } from '../components/EditButton';
import { DeleteButton } from '../components/DeleteButton';
import Header from '../components/Header';
import { employeeService } from '../services/EmployeeService';

const styles = (theme) => ({
    // table: {
    //   minWidth: 850,
    // },
    tableContainer: {
        borderRadius: 5,
        margin: '10px 0px',
        // maxWidth: 1650
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.info.light,
        color: theme.palette.getContrastText(theme.palette.info.main)
    },
    tableActionsHeaderCell: {
        textAlign: 'center'
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.main
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            employees: [],
            page: 0,
            rowsPerPage: 5
        }
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: +event.target.value, page: 0});
    }

    componentDidMount = async () => {
        try{
            const response = await employeeService.list();
            if(!response){
                return;
            }
            this.setState({employees : response.data});
            console.log(this.state);
        }catch(e){
            console.log(e);
        }
    }

    render(){
        const { classes } = this.props;
        const { page, rowsPerPage } = this.state;
        return (
            <div>
                <Header className={classes.header} mainPage={this}/>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="simple table">
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
                        {this.state.employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
                                    >{row.salary}</Typography>
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
                                rowsPerPageOptions={[5, 10]}
                                component="div"
                                count={this.state.employees.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MainPage);;