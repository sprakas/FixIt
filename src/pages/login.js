import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogin, userLogout } from '../actions/authAction'
import { TextInput } from 'react-materialize'
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
                    this.setState({
                        userData: {}
                    })
                    localStorage.setItem('token', response.token)
                    localStorage.setItem('userId',response._id)
                    this.props.userLogin()
                    this.dashboard()
                }
                else {
                    this.setState({
                        message: response.message
                    })
                }
            })
            .catch((err) => alert("error login" + err))

    }
    dashboard = () => {
        fetch('http://localhost:8080/dashboard', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.ok) { this.props.history.push('/dashBoard') } 
            })
            .catch((err) => alert("error" + err))
    }
    render() {
        if (this.props.isLoggedIn) return <Redirect to='/dashboard' />
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col s12 m6  push-m3 card' style={{ padding: '10px', marginTop: '100px' }}>
                        {
                            this.state.message ?
                                <div className="red-text center">
                                    {this.state.message}
                                </div>
                                : null
                        }
                        <form onSubmit={this.handleLogin}>
                            <TextInput name='email' email validate xl={12} onChange={this.handleChange} label='E-Mail' />
                            <TextInput name='password' type='password' xl={12} onChange={this.handleChange} label='Password'/>
                            <TextInput className='btn #263238 blue-grey darken-2 right' type='submit' value='Login' />
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