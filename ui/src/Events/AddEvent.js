import React, { Component } from 'react';
import EventsService from './EventsService';

class AddEvent extends Component {

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
      this.addEventsService.sendData(this.state).then(response=> {
        this.props.history.push('/list-event');
    })
    .catch(function (error) {
      console.log(error);
    });
      
    }

    render() {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <label>
              Event Details:
             </label><br/>
            
            <label>Event Name</label>
            <input type="text" name="eventName" onChange={this.handleChange} />
  <br/>
            <label>Event Date</label>
            <input type="text" name="eventDate" onChange={this.handleChange} />
            <br/>
            <label>Location</label>
            <input type="text" name="location" onChange={this.handleChange} />
            <br/>
             <label>Desctiption</label>
            <input type="text" name="eventDesc" onChange={this.handleChange} />
            <br/>
             <label>Department</label>
            <input type="text" name="eventDept" onChange={this.handleChange} />
            <br/>
            <label>Awards</label>
            <input type="text" name="eventPrize" onChange={this.handleChange} />
            <br/>
            <input type="submit" value="Submit" className="btn btn-primary"/>
          </form>
      </div>
      );
    }
  }

export default AddEvent;