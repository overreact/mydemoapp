import React, { Component } from 'react';
import EventsService from './EventsService';
import axios from 'axios';
import TableRow from './TableRow';

class ListEvents extends Component {

  constructor(props) {
      super(props);
      this.state = {value: '', items: ''};
      this.addItemService = new EventsService();
    }
    componentDidMount(){
        axios.get('http://localhost:4200/events/list')
      .then(response => {
        this.setState({ items: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    
       // this.addItemService.listData()
    }

    
    tabRow(status){
      if(this.state.items instanceof Array){
        if(status=='OPEN'){            
        return this.state.items.filter((obj)=>obj.cancelled===false).map(function(object, i){           
            return <TableRow obj={object} key={i} />;
        })
        }
        if(status=='DONE'){
            return this.state.items.filter((obj)=>obj.cancelled===true).map(function(object, i){
                if(object.completed==false)
                return <TableRow obj={object} key={i} />;
            })
            }
      }
    }

    render() {
      return (
        
        <div className="container">
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
