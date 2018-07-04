import React, { Component } from 'react';
import EventsService from './EventsService';
import axios from 'axios';
import TableRow from './TableRow';
import {Link} from 'react-router-dom';

class ListEvents extends Component {

  constructor(props) {
      super(props);
      this.state = {value: '', items: ''};
      this.eventsService = new EventsService();
      this.deleteData=this.deleteData.bind(this);  
    }
    componentDidMount(){
      this.refreshData();
    
       // this.addItemService.listData()
    }

    refreshData(){
      axios.get('http://localhost:4200/events/list')
      .then(response => {
        this.setState({ items: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    deleteData(id) {    
      console.log("hello"+id)
      //event.preventDefault();
     this.eventsService.deleteData(id).then(response=> {
      this.refreshData();
    })
    .catch(function (error) {
      console.log(error);
    });
    }

    tabRow(status){
      if(this.state.items instanceof Array){
        if(status=='OPEN'){            
        return this.state.items.filter((obj)=>obj.cancelled===false).map((object, i)=>{           
            return <TableRow obj={object} key={i} callDelete={this.deleteData}/>;
        })
        }
        if(status=='DONE'){
            return this.state.items.filter((obj)=>obj.cancelled===true).map((object, i)=>{              
                return <TableRow obj={object} key={i} callDelete={(id)=>this.deleteData(id)}/>;
            })
            }
      }
    }

    render() {
      return (
        
        <div className="container">
         <Link to={"/add-event"} className="btn btn-primary" >Add Event</Link>
         <hr/>
        <h1>Open Events</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>No.</td>
                  <td>Event Name</td>
                  <td>Event Description</td>
                  <td>Department</td>
                  <td>Location</td>
                  <td>Event Date</td>
                  <td>Posted Date</td>
                  <td>Awards</td>
                </tr>
              </thead>
              <tbody>
                {this.tabRow('OPEN')}
              </tbody>
            </table>
        <h1>Completed Events</h1>
        <table className="table table-striped">
              <thead>
                <tr>
                  <td>No.</td>
                  <td>Event Name</td>
                  <td>Event Description</td>
                  <td>Department</td>
                  <td>Location</td>
                  <td>Event Date</td>
                  <td>Posted Date</td>
                  <td>Awards</td>
                </tr>
              </thead>
              <tbody>
                {this.tabRow('DONE')}
              </tbody>
            </table>
        </div>
        
      );
    }
  }

export default ListEvents;
