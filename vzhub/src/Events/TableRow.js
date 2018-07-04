import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import EventsService from './EventsService';

class TableRow extends Component {

  constructor(props) {
      super(props);
      
  }
  

  render() {
    return (
        <tr>
          <td>
            {this.props.obj.__v+1}
          </td>
          <td>
            {this.props.obj.eventName}
          </td>
          <td>
            {this.props.obj.eventDesc}
          </td>
          <td>
            {this.props.obj.eventDept}
          </td>
          <td>
            {this.props.obj.location}
          </td>
          <td>
            {this.props.obj.eventDate}
          </td>
          <td>
            {this.props.obj.datePosted}
          </td>
          <td>
            {this.props.obj.eventPrize}
          </td>
          <td>
          <Link to={"/edit-event/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
        </td>
          <td>            
              <input type="submit" value="Delete" className="btn btn-danger" onClick={() =>this.props.callDelete(this.props.obj._id)}/>            
          </td>
        </tr>
    );
  }
}

export default TableRow;