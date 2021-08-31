import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { employeeService } from '../services/EmployeeService';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
});

class AddEmployee extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fullname: '',
            gender: '',
            contacts: '',
            position: '',
            salary: 0
        }
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    async handleSave(){
        const { history } = this.props;
        const userObject = {...this.state};
        userObject.salary = +userObject.salary;
        const response = await employeeService.insert(userObject);
        history.push('/');
    }

    render(){
        const {classes } = this.props;
        return(
        <form className={classes.root}>
      <TextField
        name='fullname'
        label="Fullname"
        variant="outlined"
        required
        value={this.state.fullname}
        onChange={this.handleChange.bind(this)}
      />
      <TextField
        name='gender'
        label="Gender"
        variant="outlined"
        required
        value={this.state.gender}
        onChange={this.handleChange.bind(this)}
      />
      <TextField
        name='contacts'
        label="Contacts"
        variant="outlined"
        required
        value={this.state.contacts}
        onChange={this.handleChange.bind(this)}
      />
      <TextField
        name='position'
        label="Position"
        variant="outlined"
        required
        value={this.state.position}
        onChange={this.handleChange.bind(this)}
      />
      <TextField
        name='salary'
        label="Salary"
        type="number"
        variant="outlined"
        required
        value={this.state.salary}
        onChange={this.handleChange.bind(this)}
      />
      <div>
        <Button variant="outlined" component={Link} to='/'><ClearIcon/>Cancel</Button>
        <Button variant="outlined" color="primary" 
        onClick={this.handleSave.bind(this)}
        ><SaveIcon/>Save
        </Button>
      </div>
      {/* <div>
          <Typography>Error. Try again.</Typography>
      </div> */}
    </form>
        );
    }

}

export default withStyles(styles, { withTheme: true })(AddEmployee);