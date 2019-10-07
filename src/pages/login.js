import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogin, userLogout } from '../actions/authAction'
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {}
        }
    }
    handleChange = (e) => {
        this.setState({
            userData: {
                ...this.state.userData,
                [e.target.name]: e.target.value
            }
        })
    }
    handleLogin = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.userData)
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.token) {
                    localStorage.setItem('token', response.token)
                    this.props.userLogin()
                    this.dashboard()
                    console.log(localStorage.getItem('token'))
                }
                else {
                    alert(JSON.stringify(response))
                }
            })
            .catch((err) => alert("error" + err))

    }
    dashboard = () => {
        fetch('http://localhost:8080/dashboard', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        })
            // .then((response)=>response.json())
            .then((response) => {
                this.props.history.push('/dashBoard')
            })
            .catch((err) => alert("error" + err))
    }
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col s6 push-s3 card ' style={{padding:'10px',marginTop:'100px'}}>
                        <form onSubmit={this.handleLogin}>
                            <input name='email' type='text' onChange={this.handleChange} placeholder='E-Mail' /><br />
                            <input name='password' type='password' onChange={this.handleChange} placeholder='Password' /><br />
                            <input className='waves-effect waves-light btn #263238 blue-grey darken-2 right text-white-text' type='submit' value='Login' />
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))