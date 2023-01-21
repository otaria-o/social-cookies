// import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
import { ChangeEvent, Component, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../logo/logo"


export class ResetPassword extends Component {
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
    
    handleInputChange = (evt) => {
        const property = evt.target.name; 
        // will update firstname prop dynamically in this.state variable
        this.setState({ [property]: evt.target.value });
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        // console.log(this.state)
        switch (this.state.step) {
            case "1":
                // post request : check if the user exists
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
                    // console.log(res)
                    return res.json();
                })
                .then(data => {
                    if (data.success === false) {
                        this.setState({ errorMessage: "Sorry, is this the correct email address?" })
                    } else {
                        // console.log("alles klar!!!", data); 
                    this.setState({ step: "2" });
                    this.setState({ errorMessage: "" })
                    }    
                })
                .catch(err => {
                    console.log("errore nella fetch 1!!", err)
                    // ritorna il messaggio di errore
                    this.setState({ errorMessage: "Something went wrong." })
                })
                break;

            case "2":
                // post request : check if the user exists
                fetch("/reset/pwd", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                        code: this.state.code
                    })
                })
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    // console.log("ciaooooooo", data); 
                    if (data.email === false) {
                        this.setState({ step: "2" });
                        this.setState({ errorMessage: "Sorry, is this the correct email address?"})
                    } else if (data.success === false) {
                        this.setState({ errorMessage: "Something went wrong, try again."}); 
                        this.setState({ step: "2" });   
                    } else {
                        this.setState({ step: "3" });
                        this.setState({ errorMessage: ""}); 
                        }   
                })
                .catch(err => {
                console.log("errore nella fetch 2!!", err)
                // ritorna il messaggio di errore
                this.setState({ step: "2", errorMessage: "Sorry, something went wrong."})
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
                    <form className="registrationorloginorreset" onSubmit={this.handleSubmit}>
                        <span>Enter the email address with which you registered</span>
                        <br />
                        <input required name="email" type="email" onChange={this.handleInputChange} />
                        <br />
                        <button>Submit</button>
                </form>
                <div>
                <h3 className="error">{this.state.errorMessage}</h3>
                </div>
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
                    <span>New password</span>
                    <br />
                    <input required name="password" type="password" onChange={this.handleInputChange} />
                    </div>
                    <button>Submit</button>
                    <div>
                    <h3 className="error">{this.state.errorMessage}</h3>
                    </div>
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
        return <div className="welcome">
        <div className="logo">
            <Logo />
        </div>
        <div>
            <h3>Reset the password</h3>
        </div>
        <div>
            {this.whattoRender()}
        </div>
        </div>
    }
}