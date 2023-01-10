import { Component } from "react";
import { Logo } from "../logo/logo"

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        
    }

    render() {
        return <div>
            <div>
                <Logo /> 
            </div>
                </div>
    }
}