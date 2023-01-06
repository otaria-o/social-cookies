import { Registration } from "../registration/registration"
import { ChangeEvent, Component, FormEvent } from "react";
import { Logo } from "../logo/logo"

interface LoginState {
    email?: string,
    password?: string,
}

interface LoginProps {}

export class Login extends Component<any, LoginState>{
    constructor(props) {
        super(props);
        this.state = {
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

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
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
           <Logo />
            <form onSubmit={this.handleSubmit}>
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
            </form>
        </div>
    }
}