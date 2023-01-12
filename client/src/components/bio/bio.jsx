import { ChangeEvent, Component, FormEvent } from "react";

export class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ""
        }
        this.handleBioChange = this.handleBioChange.bind(this)
    }

    handleBioChange = (evt) => {
        console.log("change")
        let newBio = evt.target.value
        this.props.changeBio({bio: newBio})
    }

    handleBioSubmit = (evt) => {
        evt.preventDefault();

        fetch("/bio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bio: this.state.bio,
                errorMessage: this.state.errorMessage
            })
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data); 
            let newBio
            this.props.changeBio(newBio)
            this.props.toggleBioEdit()
        })
        .catch(err => {
            console.log("errore nella fetch!!", err)
            // ritorna il messaggio di errore
            this.setState({ errorMessage: "Sorry, something went wrong. Fill up all the fields, please." })
        })
    }

    render() {
        return <div>
            <p>Write here your bio</p>
            <form onSubmit={(e) => this.handleBioSubmit(e)}>
                <textarea name="bio" type="text" value={this.props.bio} onChange={this.handleBioChange}/>
                <button>Save</button>
            </form>
        </div>
    }
}