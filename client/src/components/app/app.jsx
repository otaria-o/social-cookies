import { Component } from "react";
import { Logo } from "../logo/logo"
import { ProfilePic } from "../profilepic/profilepic"

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        
    }

    render() {
        return <div>
                <Logo /> 
                <ProfilePic />
                </div>
    }
}