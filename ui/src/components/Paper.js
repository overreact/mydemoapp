import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from 'react-router';
import Modal from 'react-responsive-modal';
import BigModal from './BigModal';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import EventsService from '../Events/EventsService';
import axios from 'axios';
class Paper extends Component {

  constructor(props) {
    super(props);
    this.team = {
      teamId: '',
      teamName: '',
      teamMembers: [{
        participantName: '',
        participantEmail: '',
      },
      {
        participantName: '',
        participantEmail: '',
      },
      {
        participantName: '',
        participantEmail: '',
      }]
    };
    this.state = {
      open: false,
      register: false
    };

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.registerSubmitHandler = this.registerSubmitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.completeHandler=this.completeHandler.bind(this);
    this.deleteHandler=this.deleteHandler.bind(this);
  }


  componentDidMount() {
    //this.setState({'noOfTeams':this.props.data.teams.size})
  }

  completeHandler(event){
    this.props.completeHandler(this.props.data._id);
  }

  deleteHandler(event){
   this.props.deleteData(this.props.data._id);
  }

  changeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  }


  registerSubmitHandler(event) {
    console.log("hello" + this.props.data._id);
    event.preventDefault();
    this.props.data.teams = [];
    this.team.teamName = this.state.teamName;
    this.team.teamMembers[0].participantName = this.state.participant1;
    this.team.teamMembers[1].participantName = this.state.participant2;
    this.team.teamMembers[2].participantName = this.state.participant3;
    this.team.teamMembers[0].participantEmail = this.state.email1;
    this.team.teamMembers[1].participantEmail = this.state.email2;
    this.team.teamMembers[2].participantEmail = this.state.email3;


    return axios.post('http://localhost:4200/events/register/' + this.props.data._id, {
      team: this.team
    }).then(response => {
      this.setState({ register: true });
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  onOpenModal = (type) => {
    this.setState({ register: false });
    this.setState({ modalType: type });
    console.log(type)
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  getSuccessMsg() {
    return <h1>Registration Success!. You Will receive an email shortly!</h1>
  }
  getTable() {
    const styles = {

      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginRight: 30,
        float: 'right',
        marginBottom: 10
      }
    };

    const { open } = this.state;
    const form =
      <form onSubmit={this.registerSubmitHandler} autoComplete="false">
        <TextField
          hintText="Team Name"
          floatingLabelText="Team Name"
          name="teamName"
          fullWidth={true}
          onChange={this.changeHandler}
        />

        <TextField
          hintText="Participant Name 1"
          floatingLabelText=" Name 1"
          name="participant1"

          onChange={this.changeHandler}
        />
        <TextField
          hintText="Participant Email 1"
          floatingLabelText="Email 1"
          name="email1"

          onChange={this.changeHandler}
        />

        <TextField
          hintText="Participant Name 2"
          floatingLabelText="Name 2"
          name="participant2"

          onChange={this.changeHandler}
        />
        <TextField
          hintText="Participant Email 2"
          floatingLabelText="Email 2"
          name="email2"

          onChange={this.changeHandler}
        />


        <TextField
          hintText="Participant Name 3"
          floatingLabelText="Name 3"
          name="participant3"

          onChange={this.changeHandler}
        />
        <TextField
          hintText="Participant Email 3"
          floatingLabelText="Email 3"
          name="email3"

          onChange={this.changeHandler}
        />


        <Divider />

        <div style={styles.buttons}>


          <RaisedButton label="Register"
            style={styles.saveButton}
            type="submit"
            primary={true} />
        </div>
      </form>
    const formOrMsg =
      <PageBase title="Register Team">
        {this.state.register ? this.getSuccessMsg() : form}
      </PageBase>
    const teamPopupContent =
      <PageBase title={"Teams Registered for " + this.props.data.eventName}>
        <Table>
          <TableBody displayRowCheckbox={false}>
            {this.props.data.teams.map((ele, i) => {
              return <TableRow key={i}>
                <TableRowColumn >{ele.teamName}</TableRowColumn>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </PageBase>
    const popupContent =
      <div>
        {this.state.modalType === 'TEAM' ? teamPopupContent : formOrMsg}
      </div>
    const table =
      <form>
        <div className="card card-1">
          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow key="1">
                <TableRowColumn >Event Name</TableRowColumn>
                <TableRowColumn >{this.props.data.eventName}</TableRowColumn>
              </TableRow>
              <TableRow key="2">
                <TableRowColumn >Event Desciption</TableRowColumn>
                <TableRowColumn >{this.props.data.eventDesc}</TableRowColumn>
              </TableRow>
              <TableRow key="3">
                <TableRowColumn >Department</TableRowColumn>
                <TableRowColumn >{this.props.data.eventDept}</TableRowColumn>
              </TableRow>
              <TableRow key="4">
                <TableRowColumn >Location</TableRowColumn>
                <TableRowColumn >{this.props.data.location}</TableRowColumn>
              </TableRow>
              <TableRow key="5">
                <TableRowColumn >Event Date</TableRowColumn>
                <TableRowColumn >{this.props.data.eventDate}</TableRowColumn>
              </TableRow>
              <TableRow key="6">
                <TableRowColumn >Date Posted</TableRowColumn>
                <TableRowColumn >{this.props.data.datePosted}</TableRowColumn>
              </TableRow>
              <TableRow key="7">
                <TableRowColumn >Event Prize</TableRowColumn>
                <TableRowColumn >{this.props.data.eventPrize}</TableRowColumn>
              </TableRow>
              <TableRow key="8">
                <TableRowColumn >Event Status</TableRowColumn>
                <TableRowColumn >{this.props.data.cancelled ? "Completed" : "Open"}</TableRowColumn>
              </TableRow>
              <TableRow key="9">
                <TableRowColumn >No of Teams Registered</TableRowColumn>
                <TableRowColumn >{this.props.data.teams.length}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>

            <RaisedButton label="Delete"
            style={styles.saveButton}
            type="button" secondary={true}
             onClick={this.deleteHandler} />
{this.props.data.cancelled?'':<RaisedButton label="MARK AS COMPLETE"
style={styles.saveButton}
type="button" primary={false}
 onClick={this.completeHandler} />}
              

          <RaisedButton label="View Teams"
            style={styles.saveButton}
            type="button"
            primary={true} onClick={() => this.onOpenModal('TEAM')} />
            {this.props.data.cancelled?'':
          <RaisedButton label="Register"
            style={styles.saveButton}
            type="button"
            primary={true} onClick={() => this.onOpenModal('REGISTER')} />
          }

        </div>

        <Modal open={open} onClose={this.onCloseModal} center>
          {popupContent}
        </Modal>
      </form>
    return table;
  }


  getEmpty() {
    const empty = <div className="card card-1">
      <div className="container4">
        <p>
          No Event selected to display
   </p>
      </div>
    </div>
    return empty;
  }

  render() {

    if (this.props.data.eventName != undefined && this.props.data.eventName !== '') {
      return this.getTable();
    }
    else {
      return this.getEmpty();
    }
  }
}

export default Paper;
