import { useState, useEffect } from 'react';
import { OtherProfile } from "../otherprofile/otherprofile"
// import { Link } from 'react-router-dom';

export function FindPeople ({ id }) {

    const [ search, setSearch] = useState("")
    const [ newFinds, setFind ] = useState([])
    const [ otherprofile, setOtherprofile ] = useState(false)
    const [ errMessage, setErrmessage ] = useState("")
    const [ otherUserId, setOtherUserId ] = useState("")

    const handleFinds = (evt) => {
        setSearch(evt.target.value)     
    }

    const handleClick = (evt) => {
        setOtherprofile(!otherprofile)
        setOtherUserId(evt.target.id)
    }

    useEffect(() => {
        fetch(`/search/?q=${search}`)
        .then(res => res.json())
        .then(newFinds => {
            // console.log("dati arrivati al component", newFinds)
            setFind(newFinds)
                if (newFinds.length === 0) {
                    setErrmessage("Sorry, we found no users")
            }   else { 
                setErrmessage("")
                }
        })
    },[search])
    

    useEffect(() => {
        fetch("/users")
        .then(res => res.json())
        .then(newFinds => {

        // se tra gli ultimi c'e lo user corrente non lo mostrare!!
            console.log("qui check", newFinds)
            setFind(newFinds)
            // vorrei eliminare dall'array risultante il corrente user se presente (??)
            for (let i=0; i<newFinds.length; i++) {
                if (newFinds[i].id === { id }) {
                    console.log("uguali")
                    // (newFinds[i].id = null) && (newFinds[i].first = null) && (newFinds[i].last = null) && (newFinds[i].image = null)
                }
            }
        })
    }, [])

    return ( 
        <div>
            <h2>Find people</h2>
            <br />
                <p>Are you looking for someone?</p>
                <input type="text" value={search} onChange={handleFinds} />
                <p className="error">{errMessage}</p>
                {otherprofile === false &&
                <div className="lastThree">
                    {newFinds.map((newFind) => (
                    <div className="utente" key={newFind.id}>
                        <div>
                        {/* <Link to="/otherprofile"><img id={newFind.id} src={newFind.image} onClick={handleClick}/></Link> */}
                        <img id={newFind.id} src={newFind.image} onClick={handleClick} />
                        </div>
                        <div>
                        <h3>{newFind.first} {newFind.last}</h3>
                        </div>
                    </div>))}
                </div>}
                {otherprofile &&
                <OtherProfile otherUserId={otherUserId}/>}
        </div>
    )
}
