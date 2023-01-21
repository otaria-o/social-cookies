import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function FindPeople ({ id }) {

    const [ search, setSearch] = useState("")
    const [ newFinds, setFind ] = useState([])
    const [ errMessage, setErrmessage ] = useState("")

    const handleFinds = (evt) => {
        setSearch(evt.target.value)     
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
    }, [search])
    
    useEffect(() => {
        fetch("/users")
        .then(res => res.json())
        .then(newFinds => {
            console.log("qui check", newFinds)
            setFind(newFinds)
        })
    }, [])

    return ( 
        <div className="peopleorfriends">
            <h2>Find people</h2>
            <br />
                <p>Are you looking for someone?</p>
                <input type="text" value={search} onChange={handleFinds} />
                <p className="error">{errMessage}</p>
                
                <div>
                    {newFinds.map((newFind) => (
                    <div className="user" key={newFind.id}>
                        <div>
                        <Link to={`/otheruser/${newFind.id}`}> <img id={newFind.id} src={newFind.image} /></Link>
                        </div>
                        <div>
                        <h3>{newFind.first} {newFind.last}</h3>
                        </div>
                    </div>))}
                </div>
        </div>
    )
}
