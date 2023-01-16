import { useState, useEffect } from 'react';
import { OtherProfile } from "../otherprofile/otherprofile"

export function FindPeople ({ id }) {

    const [ search, setSearch] = useState("")
    const [ newFinds, setFind ] = useState([])
    const [otherprofile, setOtherprofile ] = useState(false)

    const handleFinds = (evt) => {
        setSearch(evt.target.value);
    }

    const handleClick = (evt) => {
        let id_prof = evt.target.id
        setOtherprofile(!otherprofile)
    }

    useEffect(() => {
        fetch(`/search/?q=${search}`)
        .then(res => res.json())
        .then(newFinds => {
            // console.log("dati arrivati al component", newFinds)
            setFind(newFinds)
        })
    },[search])
    

    useEffect(() => {
        fetch("/users")
        .then(res => res.json())
        .then(newFinds => {

        // se tra gli ultimi c'e lo user corrente non lo mostrare!!
            console.log("qui check", newFinds)
            setFind(newFinds)
            for (let i=0; i<newFinds.length; i++) {
                if (newFinds[i].id === id) {
                    console.log("uguali")
                    // (newFinds[i].id = null) && (newFinds[i].first = null) && (newFinds[i].last = null) && (newFinds[i].image = null)
                }
            }
          
        // console.log("dati arrivati al component", newFinds)
        })
    }, [])

    return ( 
        <div>
            <h2>Find people</h2>
            <br />
                <p>Are you looking for someone?</p>
                <input type="text" value={search} onChange={handleFinds} />
                {otherprofile === false &&
                <div className="lastThree">
                    {newFinds.map((newFind) => (
                    <div className="utente" key={newFind.id}>
                        <div>
                        <img id={newFind.id} src={newFind.image} onClick={handleClick}/>
                        </div>
                        <div>
                        <h3>{newFind.first} {newFind.last}</h3>
                        </div>
                    </div>))}
                </div>}
                {otherprofile === true &&
                <OtherProfile handleClick={(evt) => handleClick(evt, evt.target.id)} setOtherprofile={setOtherprofile} otherprofile={otherprofile} />}
        </div>
    )
}
