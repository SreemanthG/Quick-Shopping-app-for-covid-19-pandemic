import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../login/login.css'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            loading: false,
            alert: false,
            alertMsg: ""
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }

    handleClick = () => {

        this.setState({ alert: false, alertMsg: "", loading: true })
        fetch('https://covid-19-shopping.herokuapp.com/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(res => {
                if (res.id) {
                    this.props.loadUser(res);
                    this.props.routeChange('home');
                    localStorage.setItem('user', JSON.stringify(res))
                } else {
                    this.setState({ alert: true, alertMsg: res, loading: false })
                }
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Register</h5>
                                {this.state.alert && <div class="alert alert-danger" role="alert">{this.state.alertMsg}</div>}
                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <input onChange={this.handleChange} name="name" type="text" id="inputName" className="form-control" placeholder="Name" required autoFocus />
                                        <label htmlFor="inputName">Name</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input onChange={this.handleChange} name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
                                        <label htmlFor="inputEmail">Email address</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input onChange={this.handleChange} name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>
                                    <button type="button" onClick={this.handleClick} className="btn btn-lg btn-primary btn-block text-uppercase">
                                        {this.state.loading && <CircularProgress style={{ color: "white" }} size={15} />}
                                        {!this.state.loading && "Register"}</button>
                                    <hr className="my-4" />
                                    <h6 onClick={() => this.props.routeChange('login')} style={{ textAlign: 'center', cursor: 'pointer' }}>Sign in instead</h6>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;