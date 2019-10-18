import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogin, userLogout } from '../actions/authAction'
import { Row, CardPanel, Col, Card } from 'react-materialize'
class DashBoard extends Component {
    constructor(props) {
        super()
        this.state = {

        }
    }
    componentDidMount() {
        this.getUsers()
    }
    getUsers = () => {
        fetch('http://localhost:8080/projects/projects', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response.projects)
                this.setState({ projects: response.projects })
            })
            .catch((err) => alert("error" + err))
    }
    renderProject = (project) => {
        return <Col l={3} m={4} s={6}>
            <Card className='hoverable' header={<Card className="#263238 blue-grey darken-2" style={{ paddingTop: '20px', paddingBottom: '30px' }}>
                <h5 className="white-text truncate">
                    {project.projectName}
                </h5>
                <p className="white-text">{project.createdAt}</p>
            </Card>}>
                <p className='#263238-text truncate'>
                    {project.description}
                </p>
            </Card>
        </Col>
    }
    render() {
        if (!localStorage.getItem('token')) {
            this.props.userLogout()
            return <Redirect to='/' />
        }
        return (
            <div className='container' style={{ marginTop: '100px' }}>
                <Row>
                    <Col l={3} m={4} s={6}>
                        <Link to='/createProject' >
                            <CardPanel className="#263238 blue-grey darken-2  className ='hoverable'">
                                <h5 className='white-text align-center'>Create Project</h5>
                                <p className='white-text'> Add more Projects</p>

                            </CardPanel>
                        </Link>
                    </Col>
                    {
                        this.state.projects ?
                            this.state.projects.map((project) => this.renderProject(project))
                            : null
                    }

                </Row>


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
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)