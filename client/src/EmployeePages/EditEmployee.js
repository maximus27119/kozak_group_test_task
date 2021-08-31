import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core/';
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
  error: {
    fontWeight: 'bold',
    color: theme.palette.error.main
  }
});

class EditEmployee extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          _id: '',
          fullname: '',
          gender: '',
          contacts: '',
          position: '',
          salary: 0,
          errorMessage: null
        }
    }

    setErrorMessage(error){
      this.setState({error});
    }

    clearErrorMessage(){
      this.setState({error: null});
    }

    async componentDidMount(){
        try{
            const { id } = this.props.match.params;
            if(!id)
                return;
    
            const result = await employeeService.getById(id);
            if(!result)
                return;

            const neededProperties = Object.keys(this.state);
            const employee = {};
            neededProperties.map(value => {
                employee[value] = result.data[value];
            });

            this.setState(employee);
            console.log(this.state);
        }catch(e){
            this.setErrorMessage('Произошла ошибка');
        }   
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    async handleSave(e){
      try{
        e.preventDefault();
        this.clearErrorMessage();
        const { history } = this.props;
        const userObject = {...this.state};

        delete userObject._id;
        delete userObject.errorMessage;
        
        const response = await employeeService.patchById(this.state._id, userObject);
        history.push('/');
      }catch(e){
        this.setErrorMessage('Произошла ошибка');
      }
    }

    render(){
        const {classes } = this.props;
        return(
        <form onSubmit={this.handleSave.bind(this)} className={classes.root}>
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
        <Button type="submit" variant="outlined" color="primary" 
        // onClick={this.handleSave.bind(this)}
        ><SaveIcon/>Save
        </Button>
      </div>
      <div>
      { this.state.errorMessage ? <Typography className={classes.errorMessage}>{this.state.errorMessage}</Typography> : ""}
      </div>
    </form>
        );
    }

}

export default withStyles(styles, { withTheme: true })(EditEmployee);