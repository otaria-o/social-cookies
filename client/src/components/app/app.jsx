import { Component } from "react";
import { Logo } from "../logo/logo";
import { ProfilePic } from "../profilepic/profilepic";
import { Profile } from "../profile/profile";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            image: "",
            errorMessage: ""
        }; 
    }

    componentDidMount() {
        console.log("App mounted");
        // fetch informartion from the server
        fetch("/user/:id.json", {
            method: "GET",
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
    }

    changePic = () => {
        this.setState({})
    }

    render() {
        return <div className="profpic">
            <div id="logopiccolo">
                <Logo /> 
            </div>
            <div>
                <ProfilePic first={this.firstname} last={this.lastname} pic={this.state.image} changePic={this.changePic}/>
                {/* <Profile username={this.username} /> */}
            </div>
            </div>
    }
}