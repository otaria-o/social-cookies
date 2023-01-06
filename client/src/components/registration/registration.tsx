import { Link } from "react-router-dom";
import { ChangeEvent, Component, FormEvent } from "react";
// import { Logo } from "../logo/logo"
import { Login } from "../login/login"

interface RegistrationState {
    firstname?: string,
    lastname?: string,
    email?: string,
    password?: string,
}

export class Registration extends Component<any, RegistrationState>{

    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        };
    }

    handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const property: string = evt.target.name; 
        // will update firstname prop dynamically in this.state variable
        this.setState({ [property]: evt.target.value });
    }

    handleSubmit = (evt: FormEvent) => {
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
                password: this.state.password
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
        })
    }

    render() {
        // console.log("state:", this.state);
        return <div>
            <div>
                <h1>WELCOME</h1>
                <h2>Sign up and have fun!</h2>
            </div>
            <form onSubmit={this.handleSubmit}>
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
            </form>
            <p>If you are already a member, <Link to="/login">log in please.</Link></p>
        </div>
    }
}




