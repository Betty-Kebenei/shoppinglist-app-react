import React from 'react';
import axios from 'axios';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import authRequired from './components/common/AuthRequired';
import noAuthRequired from './components/common/NoAuthRequired';
import NavBar from './components/common/NarBar';
import NotFound from './components/common/NotFound';
import WelcomePage from './components/authentication/WelcomePage';
import ListsContainer from './components/shoppinglists/ListsContainer';
import ItemsContainer from './components/shoppingitems/ItemsContainer';

import '../node_modules/toastr/build/toastr.css';

axios.defaults.baseURL = 'https://flaskapiv1.herokuapp.com';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <NavBar/>
                    <div className="App">
                        <Switch>
                            <Route exact path='/:id/:listname/shoppingitems' component={authRequired(ItemsContainer)} />
                            <Route exact path='/shoppinglists' component={authRequired(ListsContainer)} />
                            <Route exact path='/' component={noAuthRequired(WelcomePage)} />
                            <Route exact path='*' component={NotFound} />
                        </Switch>
                    </div> 
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
