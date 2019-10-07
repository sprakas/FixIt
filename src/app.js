import React,{Component} from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Header from './components/header'
import Login from './pages/login'
import Register from './pages/register'
import DashBoard from './pages/dashBoard'
import NotFound from './pages/notFound'

export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Header/>
                <Switch>
                    <Route path='/' exact component = { Login }/>
                    <Route path = '/register' component = { Register } />
                    <Route path = '/dashBoard' component = { DashBoard } />
                    <Route component={ NotFound }/>
                </Switch>
            </HashRouter>
        )
    }
}
