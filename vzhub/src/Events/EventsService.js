// ItemService.js

import axios from 'axios';

class EventsService {

  sendData(data) {
    axios.post('http://localhost:4200/events/add/post',data)
  .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  

  updateData(data, id){
    axios.post('http://localhost:4200/events/update/'+id, {
      item: data
    })
    .then(res => this.setState({ items: res.data }))
    .catch(err => console.log(err))
  }

  deleteData(id){
    axios.get('http://localhost:4200/events/delete/'+id)
    .then(console.log('Deleted')).catch(err => console.log(err))
  }
 
}

export default EventsService;
