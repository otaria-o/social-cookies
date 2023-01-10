import { ChangeEvent, Component, FormEvent } from "react";
import { Uploader } from "../uploader/uploader"

export class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUploader: false
        };
    }
    showUPloader = () => {
        this.setState({showUploader: true})  
        }

    render() {
        return <div>
            <p onClick={this.showUploader}>bla bla sono molto stanca</p>
            <Uploader />
        </div>
    }
}