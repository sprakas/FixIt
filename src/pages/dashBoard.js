import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {  userLogin, userLogout } from '../actions/authAction'
class DashBoard extends Component {
    render() {
        if(!this.props.isLoggedIn) {
           this.props.userLogout()
            return <Redirect to='/'/>
        }
        return (
            <div>
              Welcome to Fixit  
            </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(DashBoard)