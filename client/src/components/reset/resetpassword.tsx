import { ChangeEvent, Component, FormEvent } from "react";
import { Link } from "react-router-dom";

export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { step: null  };
    }
    
    handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const property: string = evt.target.name; 
        // will update firstname prop dynamically in this.state variable
        this.setState({ [property]: evt.target.value });
    }

    // handleSubmit(evt) {
    //     evt.preventDefault();
    //     switch (this.state.step) {
    //         case 1:
    //             // Make a Post request to server and check if the user exists
    //             this.setState({ step: 2 });
    //             break;
    //         case 2:
    //             this.setState({ step: 3 });
    //             break;

    //         default:
    //             break;
    //     }
    // }

    whattoRender = () => {
        switch (this.state.step) {
            case 1:
                return <div>
                    <form>
                        <span>Enter the email address with which you registered</span>
                        <br />
                        <input required name="email" type="email" onChange={this.handleInputChange} />
                        <br />
                        <button>Submit</button>
                </form>
            </div>;
            case 2:
                return <div>
                <form>
                    <span>Enter the code you received</span>
                    <br />
                    <input required name="email" type="email" onChange={this.handleInputChange} />
                    <br />
                    <div>
                    <span>Password</span>
                    <br />
                    <input required name="password" type="password" onChange={this.handleInputChange} />
                    </div>
                    <button>Submit</button>
                </form>
            </div>;
            case 3:
                return <div>
                    <h3>Success!</h3>
                    <p>You can now <Link to="/login">log in</Link> with your new password</p>
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
            <p>{this.whattoRender()}</p>
        </div>
        </div>
    }
}