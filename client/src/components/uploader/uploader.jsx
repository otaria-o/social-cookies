import { ChangeEvent, Component, FormEvent } from "react";

export class Uploader extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            pic: undefined
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)   
    }

    componentDidMount() {
        console.log("uploader mounted!")
    }

    handleFileChange(evt) {
        console.log(evt)
        console.log("la foto che ho scelto fileChange", evt.target.value)
        this.setState({pic : evt.target.files[0]});
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("Button clicked with event:", evt);
        const formData = new FormData();
        formData.append("pic", this.state.pic);

        fetch("/upload", {
            method: "POST",
            body: formData,
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("data from handleSubmit", data) 
            let newPic = data.rows[0].image
            this.props.changePic(newPic)
        })
        .catch(err => {
            console.log("errore nella fetch!!", err)
            // ritorna il messaggio di errore
            // this.setState({ errorMessage: "Sorry, something went wrong. Fill up all the fields, please." })
        })
    }           

    handleButton = () => {
        console.log("Click on close");
        this.props.toggleUploader();
    }

    render() {
        return <section className="uploader">
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <p>Want to change your image?</p>
                <br />
                <input type="file" name="pic" accept="image/*" onChange={this.handleFileChange} />
                <br />
                <button>Upload</button>
            </form> 
            <br />
            <button onClick={this.handleButton}>back</button>
        </section>
    }
}