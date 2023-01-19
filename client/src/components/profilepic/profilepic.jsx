import { ChangeEvent, Component, FormEvent } from "react";
import { Uploader } from "../uploader/uploader"

export class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUploader: false,
        };
    }
    
    toggleUploader = () => {
        console.log('I am toggling');
        this.setState({showUploader: !this.state.showUploader})  
    }

    render() {
        return <div className="pic">
                <img onClick={this.toggleUploader} src={this.props.pic} alt={this.username} />
            <div>
                {this.state.showUploader && 
                <Uploader toggleUploader = {this.toggleUploader} changePic={this.props.changePic} />}
            </div>
        </div>
    }
}
