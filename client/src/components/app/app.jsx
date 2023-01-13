import { Component } from "react";
import { Logo } from "../logo/logo";
import { ProfilePic } from "../profilepic/profilepic";
import { Profile } from "../profile/profile";
import { FindPeople } from "../findpeople/findpeople";

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
        }
    }

    componentDidMount() {
        console.log("App mounted");
        // fetch information from the server
        fetch("/user")
        .then(res => {
            return res.json();
        })
        .then(data => {
            // console.log("sono qui", data)
            this.setState({
                firstname: data.first,
                lastname: data.last,
                image: data.image,
                bio: data.bio,
            }) 
        })
    }

    changePic = (newPic) => {
        this.setState({image : newPic})
    }

    changeBio = (newBio) => {
        this.setState({bio: newBio})
    }

    logout = () => {
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => {
            return res.json();
            })
        .then(data => {
            console.log("data from logout", data)  
            if ({success: true}) {
                location.replace("/")
            }
        })
        .catch(err => {
            console.log("errore nella fetch!!", err)
        })
    }

    render() {
        return <section>
            <header className="profpic">
                <div className="logopiccolo">
                    <Logo /> 
                </div>
                <div className="pic">
                    <ProfilePic pic={this.state.image} changePic={this.changePic}/>
                </div>  
            </header>
            <hr />
            <main>
                <div className="profilebig">
                    <Profile first={this.state.firstname} last={this.state.lastname} bio={this.state.bio} changeBio={this.changeBio} pic={this.state.image} changePic={this.changePic}/>
                    <br />
                    <button onClick={this.logout}>Log out</button>
                </div>
                <div className="findpeople">
                    <FindPeople />
                </div>
            </main>
            
        </section>
    }
}