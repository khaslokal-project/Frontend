import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppProvider from './component/AppProvider';
import AppContext from './component/AppContext';
import axiosInstance from './component/AxiosInstance';
import { reactLocalStorage } from 'reactjs-localstorage';

import './App.css';
import NavbarBeforeLogin from './component/Navbar';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: ``,
            phone: ``,
            email: ``,
            address: ``
        };
    }

    render() {
        // let test = this.state.username;
        let tempDom = (<AppContext.Consumer>
            {(context) => {
                if (this.state.username && !context.user.username){
                    context.handlers.signin(this.state);
                }
                
            }}

        </AppContext.Consumer>);
        
        return (
            <div>
                <Router>
                    <AppProvider>
                        <div className="App" style={{paddingTop:`4.7rem`}} justify="center">

                            <Switch>
                                <Route exact path="/" component={NavbarBeforeLogin}/>
                                
                            </Switch>
                            { tempDom }
                        </div>
                    </AppProvider>
                </Router>
            </div>
        );
    }

    componentDidMount(){
        let token = reactLocalStorage.get(`token`);
        if (token){
            axiosInstance.get(`/users/checktoken`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then( response => {
                    this.setState({
                        username: `barangbeli`,
                        email: `wew@gmail.com`,
                        phone: `911`,
                        address: `jln mayjen sudirman`
                    });
                })
                .catch ( error => {
                    reactLocalStorage.set(`token`,false);
                    reactLocalStorage.setObject(`user`, {});
                });
        }
    }
}

export default App;