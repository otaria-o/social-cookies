import { ChangeEvent, Component, FormEvent } from "react";
import { Uploader } from "../uploader/uploader"

export class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUploader: false,
            // pic by martina_bulkova from pixaby
            pic: "profile.jpg" 
        };
    }
    
    showUploader = () => {
        this.setState({showUploader: true})  
    }

    // logout = () => {
    //     fetch("/logout", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //     })
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(data => {
    //         console.log("data from logout", data)  
    //         this.setState({})  
    //         return <Welcome />
    //     })
    //     .catch(err => {
    //         console.log("errore nella fetch!!", err)
    //     })
    // }

    

    render() {
        return <div id="divpict">
            <img id="pict" onClick={this.showUploader} src={this.state.pic} alt={this.username} />
            {this.state.showUploader && <Uploader showUploader={this.state.showUploader} handleSubmit={this.handleSubmit} pic={this.state.pic} handleButton={this.handleButton} onChange={this.handleChangeFile}/>}
            {/* <button onClick={this.logout}>Log out</button> */}
        </div>
    }
}
