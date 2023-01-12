// import { ChangeEvent, Component, FormEvent } from "react";

export class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: "",
            showBio: false,
            errorMessage: ""
        }
    }
    handleBioChange = (evt) => {
        this.setState({bio: evt.target.value})
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
            <form onSubmit={handleBioSubmit}>
                <textarea name="bio" type="text" onChange={this.handleBioChange}/>
                <button>Submit</button>
            </form>
        </div>
    }
}