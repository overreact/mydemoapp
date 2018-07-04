import React, { Component } from 'react';
import axios from 'axios';
import EventsService from './EventsService';

class EditItem extends Component {

  constructor(props) {
      super(props);
      this.eventsService = new EventsService();
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCancelled= this.handleCancelled.bind(this);
      this.state = {value: '' };
  }

  componentDidMount(){ 
    axios.get('http://localhost:4200/events/edit/'+this.props.match.params.id)
    .then(response => {
      this.setState({ value: response.data});
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleChange(event) {
    //this.setState({value: event.target.value});
    let newArr=this.state.value;
    newArr[event.target.name]=event.target.value
    this.setState({ ...newArr });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.eventsService.updateData(this.state,this.props.match.params.id).then(res => {
      this.setState({ items: res.data });
      this.props.history.push('/list-event');
    })
    .catch(err => console.log(err));;    
  }
  handleCancelled(event){
    event.preventDefault();    
    this.state.value.cancelled=true;
    this.eventsService.updateData(this.state.value,this.props.match.params.id).then(res => {
      this.setState({ items: res.data });
      this.props.history.push('/list-event');
    })
    .catch(err => console.log(err));
   
  }
  render() {
    return (
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <label>
                Edit Event:               
                
            <label>Event Name</label>
            <input type="text" name="eventName" value={this.state.value.eventName} onChange={this.handleChange} />
  <br/>
            <label>Event Date</label>
            <input type="text" name="eventDate" value={this.state.value.eventDate} onChange={this.handleChange} />
            <br/>
            <label>Location</label>
            <input type="text" name="location" value={this.state.value.location}  onChange={this.handleChange} />
            <br/>
             <label>Desctiption</label>
            <input type="text" name="eventDesc" value={this.state.value.eventDesc}  onChange={this.handleChange} />
            <br/>
             <label>Department</label>
            <input type="text" name="eventDept" value={this.state.value.eventDept}  onChange={this.handleChange} />
            <br/>
            <label>Awards</label>
            <input type="text" name="eventPrize" value={this.state.value.eventPrize}  onChange={this.handleChange} />
            <br/>           
              </label><br/>
              <input type="button" value="Mark As Complete" onClick={this.handleCancelled} className="btn btn-default"/>
              <input type="submit" value="Update" className="btn btn-primary"/>
              
            </form>
        </div>
    );
  }
}

export default EditItem;