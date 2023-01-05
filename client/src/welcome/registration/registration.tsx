import { ChangeEvent, Component, FormEvent } from "react";

interface RegistrationState {
    firstname?: string,
    lastname?: string,
    email?: string,
    password?: string,
}

interface RegistrationProps {}



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
        console.log("state:", this.state);
        return <div>
            <h1>WELCOME</h1>
            {/* <LogoComponent /> */}
            <h2>Sign up and have fun!</h2>
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
                    <br />
                </div>
                <button>Register</button>
            </form>
            {/*<a href="<Login />" <p>If you are already a member, log in please.</p></a> */}
        </div>
    }
}