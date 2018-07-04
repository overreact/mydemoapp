import React, { Component } from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import Data from '../data';
import { Icon,InlineItems,Center } from 'react-icons-kit'
import { starHalf } from 'react-icons-kit/icomoon/starHalf'
import { trophy } from 'react-icons-kit/icomoon/trophy'


import EventsService from '../Events/EventsService';
import axios from 'axios';

class TablePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          items:[],
          listOfPartipant:[]
        }
  
        this.addEventsService = new EventsService();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
  
      componentDidMount(){
this.getList();
      }
      getList(){     
      axios.get('http://localhost:4200/events/list')
      .then(response => {
        let map = new Map();
        this.setState({ items: response.data });   
        response.data.map((eventObj)=>{
          eventObj.teams.map((team)=>{
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



      handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
      }
  
      handleSubmit(event) {
        event.preventDefault();
       
      }

      getHalfIcon(){
        return  
        <div style={{ color: '#F4A261' }}>
                    <Icon size={44} icon={starHalf}/>
                </div>  
        
      }

      getFullIcon(){
        return  
        <div style={{ color: '#F4A261' }}>
                    <Icon size={44} icon={starHalf}/>
                </div>  
        
      }
  
      render() {
  
        const styles = {
          floatingActionButton: {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
          },
          editButton: {
            fill: grey500
          },
          columns: {
            id: {
              width: '10%'
            },
            name: {
              width: '40%'
            },
            price: {
              width: '20%'
            },
            category: {
              width: '20%'
            },
            edit: {
              width: '10%'
            }
          }
        };
  
    return (
      <div>
          
       
    <PageBase title="Leader Board"
              navigation="VZHUB / Leader Board">

      <div>
      
        <Link to="/form" >
          <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500} >
            <ContentAdd />
          </FloatingActionButton>
        </Link>

        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn >ID</TableHeaderColumn>
              <TableHeaderColumn >Name</TableHeaderColumn>
              <TableHeaderColumn >Email</TableHeaderColumn>              
              <TableHeaderColumn >No Of Events Attended</TableHeaderColumn>     
              <TableHeaderColumn >Badges</TableHeaderColumn>         
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.listOfPartipant.map((item,i) =>
              <TableRow key={item.id}>
                <TableRowColumn>{i+1}</TableRowColumn>
                <TableRowColumn >{item.name}</TableRowColumn>
                <TableRowColumn >{item.email}</TableRowColumn>                
                <TableRowColumn >{item.count}</TableRowColumn>
                <TableRowColumn ><div style={{ color: '#F4A261' }}>
                    <Icon size={44} icon={item.count>2?trophy:starHalf}/>
                </div></TableRowColumn>
            {/* <TableRowColumn style={styles.columns.edit}>
                  <Link className="button" to="/form">
                    <FloatingActionButton zDepth={0}
                                          mini={true}
                                          backgroundColor={grey200}
                                          iconStyle={styles.editButton}>
                      <ContentCreate  />
                    </FloatingActionButton>
                  </Link>
                </TableRowColumn>*/}
              </TableRow>
            )}
          </TableBody>
        </Table>    
      </div>
    </PageBase>
    </div>
  );
};

}
export default TablePage;
