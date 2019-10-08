import React,{Component} from 'react'
import { NavItem, Navbar} from 'react-materialize';
import { connect } from 'react-redux'
import {  userLogin, userLogout } from '../actions/authAction'
import { Link } from 'react-router-dom'

class Header extends Component {
    logOut = () => {
        localStorage.removeItem('token')
        this.props.userLogout()
    }
    render() {
            return (
                <Navbar brand={<Link to='/' style={{ paddingLeft: 40 }} className ='flow-text'>Fixit</Link>} className="#263238 blue-grey darken-2 black-text" alignLinks="right" sidenav={<li />}>
                    <NavItem>Getting started</NavItem>
                    <NavItem>About</NavItem>
                    {this.props.isLoggedIn  ? <NavItem onClick = {()=>this.logOut()}>Logout</NavItem> :
                        <Link to='/register'>Register</Link>
                    }
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