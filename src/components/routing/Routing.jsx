import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faPen, faHeart } from '@fortawesome/free-solid-svg-icons';
import MainView from '../views/MainView/MainView';
import PageNotFound from '../views/PageNotFound/PageNotFound';
import store from '../../store/store';
import { Provider } from 'unistore/react';
import FrameAdd from '../controlls/FrameAdd/FrameAdd';
import FrameEdit from '../controlls/FrameEdit/FrameEdit';

library.add(faPlus,faPen, faHeart);

const Routing = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route exact path='/' component={MainView} />
        <Route extra path='/add' component={FrameAdd} />
        <Route extra path='/edit/:id' component={FrameEdit} />
        <Route path='**' component={PageNotFound} />
      </Switch>
    </Provider>
  </BrowserRouter>
);

export default Routing;