import { ChangeEvent, Component, FormEvent } from "react";
import { ProfilePic } from "../profilepic/profilepic";
import { Link } from "react-router-dom";
import { Bio } from "../bio/bio"

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showBioEdit: false
        }
    } 

    toggleBioEdit = () => {
        console.log('I am toggling');
        console.log("props", this.props)
        this.setState({showBioEdit: !this.state.showBioEdit})  
    }

    render() {
        return <div>
            <ProfilePic pic={this.props.pic} changePic={this.changePic} />
            <h2>{this.props.first} {this.props.last}</h2>
            <p>{this.props.bio}</p>
            <br />
            {this.props.bio === null && 
            <button onClick={this.toggleBioEdit}>Add a bio</button>}
            {this.props.bio !== null && <button onClick={this.toggleBioEdit}>Edit your bio</button>}
            {this.state.showBioEdit && <Bio bio={this.props.bio} toggleBioEdit={this.toggleBioEdit} changeBio={this.props.changeBio} />}
        </div>
    }
}