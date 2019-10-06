import React,{Component} from 'react'
import ReactDom from 'react-dom'

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData : { }
        }
    }
    componentDidMount() {
        this.callApi()
    }
    callApi = () => {
        fetch('http://localhost:8080/ping')
            .then(response => response.json())
            .then((data)=>
                this.setState({
                    data
                })
            )
            .catch((err)=>alert("error"+err))
       
        // if (response.status !== 200) throw Error(body.message);
    };
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
            alert(JSON.stringify(response))
        )
        .catch((err)=>alert("error"+err))
   
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
        .then((response)=>response.json())
        .then ((response)=>{
            if(response.token){
                localStorage.setItem('token', response.token)
                alert(localStorage.getItem('token'))
            }
            else {
                alert(JSON.stringify(response))
            }
        })
        .catch((err)=>alert("error"+err))
   
    }
    dashboard = () => {
        fetch('http://localhost:8080/dashboard', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-auth-token' : localStorage.getItem('token')
            }
        })
        // .then((response)=>response.json())
        .then ((response)=>{
                alert(JSON.stringify(response))
        })
        .catch((err)=>alert("error"+err))
    }
    render() {
        return (
            <div>
               <form onSubmit = {this.handleSubmit}>
                   <input name = 'name' type = 'text' onChange = { this.handleChange } placeholder = 'Name'/><br/>
                   <input name = 'email' type = 'text' onChange = { this.handleChange } placeholder = 'E-Mail'/><br/>
                   <input name = 'password' type = 'password' onChange = { this.handleChange } placeholder = 'Password'/><br/>
                   <input name = 'isAdmin' type = 'text' onChange = { this.handleChange } placeholder = 'isAdmin'/>
                    <input type='submit' value = 'Register'/>
               </form>
               <form onSubmit = {this.handleLogin}>
                   <input name = 'email' type = 'text' onChange = { this.handleChange } placeholder = 'E-Mail'/><br/>
                   <input name = 'password' type = 'password' onChange = { this.handleChange } placeholder = 'Password'/><br/>
                    <input type='submit' value = 'Login'/>
               </form>
               <button onClick = {this.dashboard}>dasboard</button>
               <p>{JSON.stringify(this.state.userData)}</p>
            </div>
        )
    }
}


ReactDom.render(<App/>,document.getElementById('root'))