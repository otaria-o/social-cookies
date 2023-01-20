import { Component } from "react";
import { Logo } from "../logo/logo";
import { ProfilePic } from "../profilepic/profilepic";
import { Profile } from "../profile/profile";
import { FindPeople } from "../findpeople/findpeople";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OtherProfile } from "../otherprofile/otherprofile";
import { Link } from "react-router-dom";
import { Friends } from "../friends/friends"

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            // pic by martina_bulkova from pixaby
            image: "profile.jpg",
            bio: null,
            finds: [],
            errorMessage: ""
        }
    }

    componentDidMount() {
        console.log("App mounted");
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
        this.setState({image: newPic})
    }

    changeBio = (newBio) => {
        this.setState({bio: newBio})
    }

    changeFindUsers = (newFinds) => {
        this.setState({finds: newFinds})
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
            // console.log("data from logout", data)  
            if ({success: true}) {
                location.replace("/")
            }
        })
        .catch(err => {
            console.log("errore nella fetch!!", err)
        })
    }

    render() {
        return <>
        <BrowserRouter>
            <header className="header">
                <div className="logopiccolo">
                <Logo /> 
                </div>
                <nav className="nav">
                    <Link to="/people"><button>Meet people</button></Link>
                    <Link to="/myfriends"><button>Friends</button></Link>
                    <Link to="/"><button>Edit your profile</button></Link>
                    <button onClick={this.logout}>Log out</button><br />
                </nav>    
                <ProfilePic pic={this.state.image} changePic={this.changePic} />
            </header>
            <hr />
            <main>
                <Routes>    
                    <Route path="/" element={<Profile first={this.state.firstname} last={this.state.lastname} bio={this.state.bio} changeBio={this.changeBio} pic={this.state.image} changePic={this.changePic}/>}></Route>
                    <Route path="/people" element={<FindPeople />}></Route>
                    <Route path="/myfriends" element={<Friends id={this.state.id}/>}></Route>
                    <Route path="/otheruser/:otherUserId" element={<OtherProfile />}></Route>
                </Routes>
            </main>
            </BrowserRouter>
        </>
    }
}