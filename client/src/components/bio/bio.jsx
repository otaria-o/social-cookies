import { ChangeEvent, Component, FormEvent } from "react";

export class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            newBio: ""
        }
        this.handleBioChange = this.handleBioChange.bind(this)
        // this.handleBioSubmit = this.handleBioSubmit(this)
    }

    handleBioChange = (evt) => {
        console.log("change", evt.target.value)
        this.setState({newBio: evt.target.value})
    }

    handleBioSubmit = (evt) => {
        evt.preventDefault();

        fetch("/bio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bio: this.state.newBio,
                errorMessage: this.state.errorMessage
            })
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("dati dal bio component", data); 
            this.props.changeBio(data.bio)
            this.props.toggleBioEdit()
        })
        .catch(err => {
            console.log("errore nella fetch!!", err)
            this.setState({ errorMessage: "Sorry, something went wrong. Fill up all the fields, please." })
        })
    }

    render() {
        return <div>
            <form onSubmit={(evt) => this.handleBioSubmit(evt)}>
                <textarea name="bio" type="text" onChange={(evt) => this.handleBioChange(evt)}/>
                <button>Save</button>
            </form>
        </div>
    }
}