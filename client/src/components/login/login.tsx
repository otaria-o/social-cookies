import { ChangeEvent, Component, FormEvent } from "react";
import { Link } from "react-router-dom";

interface RegistrationState {
    firstname?: string,
    lastname?: string,
    email?: string,
    password?: string,
    errorMessage?: string
}

export class Login extends Component<any, RegistrationState>{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: ""
        };
    }

    handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const property: string = evt.target.name; 
        // will update firstname prop dynamically in this.state variable
        this.setState({ [property]: evt.target.value });
    }

    handleSubmit = (evt: FormEvent) => {
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
            console.log(data); 
            location.reload()
        })
        .catch(err => {
            console.log("errore nella fetch!!", err)
            // ritorna il messaggio di errore
            this.setState({ errorMessage: "Sorry, something went wrong." })
        })
    }

    render() {
        // console.log("state:", this.state);
        return <div className="welcome">
            <div>
                <h2>Happy to see you again</h2>
            </div><br />
            <form className="registrationorlogin" onSubmit={this.handleSubmit}>
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