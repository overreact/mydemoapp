/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import AddItem from './component/AddItem';
import EditItem from './component/EditItem';
import IndexItem from './component/IndexItem';

import AddEvent from './Events/AddEvent';
import ListEvents from './Events/ListEvents';
import EditEvent from './Events/EditEvent';


ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        {/*<Route path='/add-item' component={AddItem} />
        <Route path='/index' component={IndexItem} />
<Route path='/edit/:id' component={EditItem} />*/}
<Route path='/add-event' component={AddEvent} />
<Route path='/list-event' component={ListEvents} />
<Route path='/edit-event/:id' component={EditEvent} />

      </div>
  </Router>,
  document.getElementById('root')
);