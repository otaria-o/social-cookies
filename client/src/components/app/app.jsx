import { Component } from "react";
import { Logo } from "../logo/logo";
import { ProfilePic } from "../profilepic/profilepic";
import { Profile } from "../profile/profile";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        }; 
    }

    componentDidMount() {
        console.log("App mounted");
        // fetch informartion from the server
    }

    render() {
        return <div>
                <Logo /> 
                {/* <Profile username={this.username} /> */}
                <ProfilePic />
                </div>
    }
}