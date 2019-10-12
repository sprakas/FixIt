import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogin, userLogout } from '../actions/authAction'
import { TextInput} from 'react-materialize'

class CreateProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectData : {
                admin : localStorage.getItem('userId')
            }
        }
    }
    handleChange = (e) => {
        this.setState({
            projectData : {
                ...this.state.projectData,
                [e.target.name] : e.target.value
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/projects/createProject', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(this.state.projectData)
        })
        .then((response)=>response.json())
        .then((response) => {
            if(response.message){
                this.setState({
                    message : response.message
                })
            }
            else {
                this.props.history.push('dashBoard')
            }
        })
        .catch((err) => alert("error" + err))
    }
    render() {
        // if (!this.props.isLoggedIn) {
        //     this.props.userLogout()
        //     return <Redirect to='/' />
        // }
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
                    <TextInput name = 'projectName' type = 'text' xl = {12} onChange = { this.handleChange } label = 'Project Name'/>
                    <TextInput name = 'description' type = 'text' xl = {12} onChange = { this.handleChange } label = 'Project Description'/>
                    <TextInput className='waves-effect waves-light btn #263238 blue-grey darken-2 right text-white-text' type='submit' value = 'Create Proect'/>
               </form>
                   </div>
               </div> 
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userLogin: () => dispatch(userLogin()),
        userLogout: () => dispatch(userLogout())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProject))