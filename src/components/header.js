import React,{Component} from 'react'
import { NavItem, Navbar} from 'react-materialize';
import { connect } from 'react-redux'
import {  userLogin, userLogout } from '../actions/authAction'

class Header extends Component {
    logOut = () => {
        localStorage.removeItem('token')
        this.props.userLogout()
    }
    render() {
            return (
                <Navbar brand={<a style={{ paddingLeft: 40 }} className ='flow-text'>Fixit</a>} className="#263238 blue-grey darken-2 black-text" alignLinks="right" sidenav={<li />}>
                    <NavItem href="">Getting started</NavItem>
                    <NavItem href="">About</NavItem>
                    {this.props.isLoggedIn  && <NavItem onClick = {()=>this.logOut()}>Logout</NavItem>}
                </Navbar>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn : state.auth.isLoggedIn
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        userLogin : () => dispatch(userLogin()),
        userLogout : () => dispatch(userLogout())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);