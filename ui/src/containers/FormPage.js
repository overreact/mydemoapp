import React, { Component } from 'react';
import {Link} from 'react-router';
import { Redirect } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';

import EventsService from '../Events/EventsService';
import { browserHistory } from 'react-router'



class FormPage extends Component {

  constructor(props) {
      super(props);
      this.state = {
      eventId: '',
      eventName:'',
      eventDate: '',
      datePosted: '',
      location:  '',
      eventDesc:  '',
      eventDept:  '',
      eventPrize: ''}

      this.addEventsService = new EventsService();
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
      console.log(this.state);
    }

    handleSubmit(event) {
      event.preventDefault();
      this.addEventsService.sendData(this.state).then(function(res) {
        console.log(this.props)
        //this.props.history.push('/list-event');
        browserHistory.push('/dashboard')
      }.bind(this))
/*      
      then((response)=> {
        this.props.history.push('/dashboard');
    })
    .catch(function (error) {
      console.log(error);
    });*/
      
    }

    render() {

  const styles = {
    toggleDiv: {
      maxWidth: 300,
      marginTop: 40,
      marginBottom: 5
    },
    toggleLabel: {
      color: grey400,
      fontWeight: 100
    },
    buttons: {
      marginTop: 30,
      float: 'right'
    },
    saveButton: {
      marginLeft: 5
    }
  };

  return (
    <PageBase title="Add Event"
              navigation="VZHUB / Add Event">
   <form onSubmit={this.handleSubmit} autoComplete="false">

        <TextField
          hintText="Event Name"
          floatingLabelText="Name"
          fullWidth={true}
          name="eventName"
          onChange={this.handleChange}
        />

        <TextField
          hintText="Event Description"
          floatingLabelText="Description"
          fullWidth={true}
          name="eventDesc"
          onChange={this.handleChange}
        />

         <TextField
          hintText="Department"
          floatingLabelText="Department"          
          name="eventDept"
          onChange={this.handleChange}
        />

  <TextField
          hintText="Winner Awards"
          floatingLabelText="Awards"          
          name="eventPrize"
          onChange={this.handleChange}
        />
        
        <TextField
          hintText="Event Date"
          floatingLabelText="Event Date"          
          name="eventDate"
          onChange={this.handleChange}
          />
          <TextField
          floatingLabelText="Location"               
          name="location"
          onChange={this.handleChange}
          >
         
        </TextField>

  
  {/* <div style={styles.toggleDiv}>
          <Toggle
            label="Disabled"
            labelStyle={styles.toggleLabel}
          />
        </div>*/}

        <Divider/>

        <div style={styles.buttons}>
          <Link to="/">
            <RaisedButton label="Cancel"/>
          </Link>

          <RaisedButton label="Save"
                        style={styles.saveButton}
                        type="submit"
                        primary={true}/>
        </div>
      </form>
    </PageBase>
   );
  }
}

export default FormPage;
