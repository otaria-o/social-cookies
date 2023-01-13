import { Component } from "react";
import { useNavigate } from 'react-router';
import { Logo } from "../logo/logo";
import { ProfilePic } from "../profilepic/profilepic";
import { Profile } from "../profile/profile";
import { Bio } from "../bio/bio"

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            // pic by martina_bulkova from pixaby
            image: "profile.jpg",
            bio: null,
            errorMessage: ""
        }; 
        this.changeBio = this.changeBio.bind(this)
    }

    componentDidMount() {
        console.log("App mounted");
        // fetch information from the server
    //     fetch("/")
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(data => {
    //         this.setState({
    //             firstname: data.rows[0].first,
    //             // lastname: last,
    //             // email: "",
    //             // password: "",
    //             image: data.rows[0].image
                    // bio:
    //         })
    //         console.log(this.state)
    //     })
    }

    changePic = (newPic) => {
        this.setState({image : newPic})
    }

    changeBio = (newBio) => {
        this.setState({bio: newBio})
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
    //         let navigate = use navigate()  
    //         navigate("/")
    //     })
    //     .catch(err => {
    //         console.log("errore nella fetch!!", err)
    //     })
    // }

    render() {
        return <section className="profpic">
            <header>
                <Logo /> 
                <ProfilePic pic={this.state.image} changePic={this.changePic}/>
            </header>
            
            <main>
                <Profile first={this.firstname} last={this.lastname} bio={this.bio} changeBio={this.changeBio} pic={this.state.image} changePic={this.changePic}/>
            </main>
        </section>
    }
}