// ItemService.js

import axios from 'axios';

class EventsService {

  sendData(data) {
  return  axios.post('http://localhost:4200/events/add/post',data)
  
  }

  

  updateData(data, id){
   return axios.post('http://localhost:4200/events/update/'+id, {
      item: data
    })
    
  }

  deleteData(id){
    return axios.get('http://localhost:4200/events/delete/'+id);    
  }
 
}

export default EventsService;
