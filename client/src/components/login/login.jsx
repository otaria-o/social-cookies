import { ChangeEvent, Component, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../logo/logo"


export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: ""
        };
    }

    handleInputChange = (evt) => {
        const property = evt.target.name; 
        // will update firstname prop dynamically in this.state variable
        this.setState({ [property]: evt.target.value });
    }

    handleSubmit = (evt) => {
        evt.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                errorMessage: this.state.errorMessage
            })
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.success = false) {
                this.setState({ errorMessage: "Sorry, something went wrong." })
            } else {
                console.log(data); 
                location.assign("/")
                this.setState({ errorMessage: "" })
            }
        })
        .catch(err => {
            console.log("errore nella fetch!!", err)
            // ritorna il messaggio di errore
            
        })
    }

    render() {
        return <div className="welcome">
            <div className="logo">
                <Logo />
            </div>
            <div>
                <h2>Happy to see you again</h2>
            </div><br />
            <form className="registrationorloginorreset" onSubmit={this.handleSubmit}>
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
                <button>Enter</button>
            </form><br />
            <Link to="/reset"><p>Forgot the password?</p></Link>
            <h3 className="error">{this.state.errorMessage}</h3>
        </div>
    }
}