import React, { Component } from 'react';
import {cyan600, pink600, purple600, orange600,white} from 'material-ui/styles/colors';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Face from 'material-ui/svg-icons/action/face';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import Subject from 'material-ui/svg-icons/action/subject';
import InfoBox from '../components/dashboard/InfoBox';
import RecentlyProducts from '../components/dashboard/RecentlyProducts';
import globalStyles from '../styles';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import EventsService from '../Events/EventsService';
import axios from 'axios';
import Paper from '../components/Paper'
import MapView from '../components/mapview';
import {typography} from 'material-ui/styles';

import Data from '../data';
import {Paper  as pap} from 'material-ui/Paper';



class DashboardPage extends Component {
 

  constructor(props) {
      super(props);
    this.state = { value: '', items: [], selectedItem: {}, listOfPartipant: [], eventsCount:0,teamsCount:0};
      this.eventsService = new EventsService();
      this.deleteData=this.deleteData.bind(this);  
      this.clickEventHandler=this.clickEventHandler.bind(this);
      this.completeHandler=this.completeHandler.bind(this);
    }
    
    clickEventHandler(id){
      console.log(id)
      console.log(this.props)
     this.setState({ selectedItem:  this.state.items.filter((obj)=>obj._id===id)[0] });
     console.log(this.state.selectedItem)
    }
    componentDidMount(){
      this.refreshData();
      this.getList();
    
       // this.addItemService.listData()
    }



            getList(){     
            axios.get('http://localhost:4200/events/list')
            .then(response => {
              let map = new Map();
              this.setState({ eventsCount: response.data.length });   
              response.data.map((eventObj)=>{
                eventObj.teams.map((team)=>{
                  this.setState({ teamsCount:this.state.teamsCount+1 }); 
                  team.teamMembers.map((member)=>{
                  if(map.has(member.participantEmail)){
                    map.set(member.participantEmail,{memberName:member.participantName,noOfEvents:(map.get(member.participantEmail).noOfEvents+1)})
                  }else{
                    if(member.participantEmail!=undefined && member.participantEmail!='')
                    map.set(member.participantEmail,{memberName:member.participantName,noOfEvents:1})
                  }
                })
              })
              });
              console.log(map)
              var keys =[ ...map.keys() ];
              var listOfPartipant=[];
              keys.forEach(element => {
                const participant={
                  name:map.get(element).memberName,
                  email:element,
                  count:map.get(element).noOfEvents,
                }
                listOfPartipant.push(participant)
              });
             
              this.setState({listOfPartipant:listOfPartipant})
              console.log(this.state);
            })
            .catch(function (error) {
              console.log(error);
            })
            
          }
    refreshData(){
      this.setState({ selectedItem:  ''});
      axios.get('http://localhost:4200/events/list')
      .then(response => {
        this.setState({ items: response.data });        
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    completeHandler(id){    
      event.preventDefault();    
      this.state.selectedItem.cancelled=true;
      this.eventsService.updateData(this.state.selectedItem,id).then(res => {
        this.refreshData();      
      })
      .catch(err => console.log(err));
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

  
    getPaper(){
      return <Paper data={this.state.selectedItem} deleteData={(id)=>this.deleteData(id)} completeHandler={(id)=>this.completeHandler(id)}/>;
    }

    getEmpty(){
      const empty=<div className="card card-1">
      <div className="container4">
      <p>
       No Event selected to display
       </p>
       </div>
      </div>
      return empty;
    }
    render() {

      this.styles = {
        subheader: {
          fontSize: 24,
          fontWeight: typography.fontWeightLight,
          backgroundColor: cyan600,
          color: white
        }
      };
  return (
    <div>
      <h3 style={globalStyles.navigation}>VZHUB / Events</h3>

      <div className="row">

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={Subject}
                   color={pink600}
                   title="Total Participants"
                   value={this.state.listOfPartipant.length}
          />
        </div>


        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={ThumbUp}
                   color={cyan600}
                   title="Total Number of Events"
                   value={this.state.eventsCount}
          />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={Assessment}
                   color={purple600}
                   title="No Of Teams Registered"
                   value={this.state.teamsCount}
              
          />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={Face}
                   color={orange600}
                   title="New Members"
                   value="5"
          />
        </div>
      </div>
      <div className="row">      
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
          <RecentlyProducts data={this.state.items} key ="1" status="OPEN" header="Upcoming Events" clickEventHandler={(id)=>this.clickEventHandler(id)}/>
        </div>
        
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
          <RecentlyProducts data={this.state.items} key ="2"  status="DONE" header="Closed Events" clickEventHandler={(id)=>this.clickEventHandler(id)}/>
        </div>
      
      </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
        {this.getPaper()}
         
        </div>
      </div>
      <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 card card-1">
      
      <pap>
        <List>
          <Subheader style={this.styles.subheader}>Events around the world</Subheader>
          <MapView />             
        </List>
      </pap>
      </div>
      
    </div>
    </div>
  );
};
}

export default DashboardPage;
