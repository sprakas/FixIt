import React,{Component} from 'react'
import ReactDom from 'react-dom'

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {}
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
    render() {
        return (
            <div>
                {this.state.data ?
                    this.state.data.map((item) => <div>{item.name}</div>)
                    :
                    'hello world'
                }
            </div>
        )
    }
}


ReactDom.render(<App/>,document.getElementById('root'))