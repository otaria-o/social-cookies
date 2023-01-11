import { ChangeEvent, Component, FormEvent } from "react";

export class Uploader extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        console.log("uploader mounted!");
        console.log(req.session.userId)
    }

    handleFileChange(evt) {
        console.log(evt)
        console.log("la foto che ho scelto", evt.target.value)
        this.pic = evt.target.value;
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("Button clicked with event:", evt);
        const formData = new FormData();
        formData.append("pic", this.pic);

        fetch("/upload", {
            method: "POST",
            body: formData,
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("data from handleSubmit", data)  
            this.setState({})  
        })
        .catch(err => {
            console.log("errore nella fetch!!", err)
            // ritorna il messaggio di errore
            // this.setState({ errorMessage: "Sorry, something went wrong. Fill up all the fields, please." })
        })
    }           

    handleButton = () => {
        this.setState({showUploader: false})
    }

    render() {
        return <div>
            <form onSubmit={() => this.handleSubmit()}>
            <div>
                <p>Want to change your image?</p>
                    <span>Choose a file</span>
                    <input type="file" name="pic" accept="image/*" onChange={this.handleFileChange} />
                </div>
                <button>Upload</button>
            </form> 
            <button onClick={this.handleButton}>X</button>
        </div>
    }
}