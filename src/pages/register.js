import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { TextInput} from 'react-materialize'

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
        .then ((response)=> {
            if(response._id) {
                this.setState({
                    userData: {}
                })
                this.props.history.push('/')
            }
            else if(response.message) {
                this.setState({
                    message : response.message
                })
            }
            
        })
        .catch((err)=>alert("error"+err))
   
    }
    render() {
        return (
            <div className="container">
               <div className='row'>
               <div className='col s12 m6  push-m3 card' style={{padding:'10px',marginTop:'100px'}}>
                    {
                        this.state.message ?
                            <div className="red-text center">
                                {this.state.message}
                            </div>
                         : null
                    }
                    <form onSubmit = {this.handleSubmit}>
                    <TextInput name = 'name' type = 'text' xl = {12} onChange = { this.handleChange } label = 'Name'/>
                    <TextInput name = 'email' email validate xl = {12} onChange = { this.handleChange } label = 'E-Mail'/>
                    <TextInput name = 'password' type = 'password' xl = {12} onChange = { this.handleChange } label = 'Password'/>
                    <TextInput className='waves-effect waves-light btn #263238 blue-grey darken-2 right text-white-text' type='submit' value = 'Register'/>
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