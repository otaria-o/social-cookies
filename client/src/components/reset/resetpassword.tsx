import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
import { ChangeEvent, Component, FormEvent } from "react";
import { Link } from "react-router-dom";

interface ResetState {
    step?: "1" | "2" | "3",
    email?: string,
    password?: string,
    code?: string,
    errorMessage?: string
}

export class ResetPassword extends Component<any, ResetState> {
    constructor(props) {
        super(props);
        this.state = { 
            step: "1",
            email: "",
            password: "",
            code: "",
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
        console.log(this.state)
        switch (this.state.step) {
            case "1":
                // Make a Post request to server and check if the user exists
                fetch("/reset", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                    })
                })
                .then(res => {
                    console.log(res)
                    return res.json();
                })
                .then(data => {
                    console.log("alles klar!!!", data); 
                    this.setState({ step: "2" });
                })
                .catch(err => {
                    console.log("errore nella fetch 1!!", err)
                    // ritorna il messaggio di errore
                    this.setState({ errorMessage: "Sorry, something went wrong, is this the correct email address?" })
                })
                break;

            case "2":
                // Make a Post request to server and check if the user exists
                fetch("/reset/pwd", {
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
                    console.log("ciaooooooo", data); 
                    if (data.success) {
                        this.setState({ step: "3" });
                    } else {
                        this.setState({ errorMessage: "Sorry, something went wrong, try again."});
                    }
                    
                })
                .catch(err => {
                console.log("errore nella fetch 2!!", err)
                // ritorna il messaggio di errore
                this.setState({ step: "2", errorMessage: "Sorry, something went wrong, try again." })
                })
                break;

                // default:
                // break;
        }
    }

    whattoRender = () => {
        switch (this.state.step) {
            case "1":
                return <div>
                    <form onSubmit={this.handleSubmit}>
                        <span>Enter the email address with which you registered</span>
                        <br />
                        <input required name="email" type="email" onChange={this.handleInputChange} />
                        <br />
                        <button>Submit</button>
                </form>
                <h3 className="error">{this.state.errorMessage}</h3>
            </div>;
            case "2":
                return <div>
                <form onSubmit={this.handleSubmit}>
                    <span>Email address</span>
                    <br />
                    <input required name="email" type="email" onChange={this.handleInputChange} />
                    <br />
                    <span>Enter the code you received</span>
                    <br />
                    <input required name="code" type="text" onChange={this.handleInputChange} />
                    <br />
                    <div>
                    <span>Password</span>
                    <br />
                    <input required name="password" type="password" onChange={this.handleInputChange} />
                    </div>
                    <button>Submit</button>
                    <h3 className="error">{this.state.errorMessage}</h3>
                </form>
            </div>;
            case "3":
                return <div>
                    <h3>Success!</h3>
                    <p>You can now <Link to="/login">log in</Link> with your new password</p>
                    <h3 className="error">{this.state.errorMessage}</h3>
                    </div>;

            default:
                break;
        }
    }
    
    render() {
        return <div>
        <div>
            <h3>Reset the password</h3>
        </div>
        <div>
            {this.whattoRender()}
        </div>
        </div>
    }
}