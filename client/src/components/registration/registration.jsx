import { Link } from "react-router-dom";
import { ChangeEvent, Component, FormEvent } from "react";
import { Logo } from "../logo/logo"


export class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            errorMessage: ""
        };
    }

    handleInputChange = (evt) => {
        const property = evt.target.name; 
        // will update firstname prop dynamically in this.state variable
        this.setState({ 
            ...this.state,
            [property]: evt.target.value });
    }

    handleSubmit = (evt) => {
        evt.preventDefault();

        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                errorMessage: this.state.errorMessage
            })
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data.success); 
            if (!data.success) {
                this.setState({ errorMessage: "Sorry, something went wrong. Fill up all the fields, please." })
            } else {
                location.assign("/")
            }
        })
        .catch(err => {
            console.log("errore nella fetch!!", err)
            this.setState({ errorMessage: "Sorry, something went wrong. Fill up all the fields, please." })
        })
    }

    render() {
        return <div className="welcome">
            <div className="logo">
                <Logo />
            </div>
            <div>
                <h1>WELCOME</h1>
            </div><br />
            <form className="registrationorloginorreset" onSubmit={this.handleSubmit}>
                <div>
                    <span>Firstname</span>
                    <br />
                    <input required name="firstname" type="text" onChange={this.handleInputChange} />
                </div>
                <div>
                    <span>Lastname</span>
                    <br />
                    <input required name="lastname" type="text" onChange={this.handleInputChange} />
                </div>
                <div>
                    <span>Email</span>
                    <br />
                    <input required name="email" type="email" onChange={this.handleInputChange} />
                </div>
                <div>
                    <span>Password</span>
                    <br />
                    <input required name="password" type="password" onChange={this.handleInputChange} />
                </div>
                <br />
                <button>Register</button>
            </form><br />
            <p>If you are already a member, <Link to="/login">log in</Link>, please.</p>
            <h3 className="error">{this.state.errorMessage}</h3>
        </div>
    }
}




