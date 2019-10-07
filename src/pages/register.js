import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData : { }
        }
    }
    handleChange = (e) => {
        this.setState({
            userData : {
                ...this.state.userData,
                [e.target.name] : e.target.value
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.userData)
        })
        .then((response)=>response.json())
        .then ((response)=>
        this.props.history.push('/login')
        )
        .catch((err)=>alert("error"+err))
   
    }
    render() {
        return (
            <div className="container">
               <div className='row'>
               <div className='col s6 push-s3 card ' style={{padding:'10px',marginTop:'100px'}}>
                    <form onSubmit = {this.handleSubmit}>
                    <input name = 'name' type = 'text' onChange = { this.handleChange } placeholder = 'Name'/><br/>
                    <input name = 'email' type = 'text' onChange = { this.handleChange } placeholder = 'E-Mail'/><br/>
                    <input name = 'password' type = 'password' onChange = { this.handleChange } placeholder = 'Password'/><br/>
                    <input name = 'isAdmin' type = 'text' onChange = { this.handleChange } placeholder = 'isAdmin'/>
                    <input className='waves-effect waves-light btn #263238 blue-grey darken-2 right text-white-text' type='submit' value = 'Register'/>
               </form>
                   </div>
               </div> 
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn : state.auth
    }
  }
  
export default withRouter(connect(mapStateToProps)(Register))