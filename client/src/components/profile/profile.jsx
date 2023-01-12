import { ChangeEvent, Component, FormEvent } from "react";
import { ProfilePic } from "../profilepic/profilepic";
import { Link } from "react-router-dom";
import { Bio } from "../bio/bio"

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: "",
            showBioEdit: false
        }
    }
    // changeBio = (newBio) => {
    //     this.setState({bio: newBio})
    // }

    toggleBioEdit = () => {
        console.log('I am toggling');
        this.setState({showBioEdit: !this.state.showBioEdit})  
    }

    render() {
        return <div>
            <ProfilePic />
            <h2>{this.props.first} {this.props.last}</h2>
            <p>{this.state.bio}</p>
            <br />
            {this.state.bio.length===0 && 
            <button onClick={this.toggleBioEdit}>Add a bio</button>}
            {this.state.bio.length>0 && <button onClick={this.toggleBioEdit}>Edit</button>}
            {this.state.showBioEdit && <Bio bio={this.state.bio} toggleBioEdit={this.toggleBioEdit} changeBio={this.changeBio} />}
        </div>
    }
}