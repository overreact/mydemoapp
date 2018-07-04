import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {grey400, cyan600, white} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
import Wallpaper from 'material-ui/svg-icons/device/wallpaper';

class RecentlyProducts extends Component {
 

  constructor(props) {
      super(props);
  
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

  this.iconButtonElement = (
    <IconButton
      touch={true}
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={grey400} />
    </IconButton>
  );

  this.rightIconMenu =(
    <IconMenu iconButtonElement={this.iconButtonElement}>
      <MenuItem key="1">View</MenuItem>
      <MenuItem key="2">Edit</MenuItem>
    </IconMenu>
  );
  if(this.props.status==="OPEN"){
  return (
    <Paper>
      <List>
        <Subheader style={this.styles.subheader}>{this.props.header}</Subheader>
        {this.props.data.filter((obj)=>obj.cancelled===false).map(item =>
          <div key={item.eventName}>
            <ListItem key={item._id+item.eventName}
              leftAvatar={<Avatar icon={<Wallpaper />} />}
              primaryText={item.eventName}
              secondaryText={item.eventName}   
              onClick={(event) => this.props.clickEventHandler(item._id,event)}           
            />
            <Divider inset={true} />
          </div>
        )}
      </List>
    </Paper>
  );
}else{  
    return (
      <Paper>
        <List>
          <Subheader style={this.styles.subheader}>{this.props.header}</Subheader>
          {this.props.data.filter((obj)=>obj.cancelled===true).map(item =>
            <div key={item.eventName}>
              <ListItem key={item._id}
                leftAvatar={<Avatar icon={<Wallpaper />} />}
                primaryText={item.eventName}
                secondaryText={item.eventName}
                rightIconButton={this.rightIconMenu}
                onClick={(event) => this.props.clickEventHandler(item._id,event)}    
              />
              <Divider inset={true} />
            </div>
          )}
        </List>
      </Paper>
    );

}
};
}

export default RecentlyProducts;
