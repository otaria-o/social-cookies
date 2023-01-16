import { useState, useEffect } from 'react';

export function FindPeople () {

    const [ search, setSearch] = useState("")
    const [ newFinds, setFind ] = useState([])

    const handleFinds = (evt) => {
        setSearch(evt.target.value);
    }

    useEffect(() => {
        fetch(`/search/?q=${search}`)
        .then(res => res.json())
        .then(newFinds => {
            // console.log("dati arrivati al component", newFinds)
            setFind(newFinds)
        })
    },[search])
    
    console.log("search", search)

    useEffect(() => {
        fetch("/users")
        .then(res => res.json())
        .then(newFinds => {
        // se tra gli ultimi c'e lo user corrente non lo mostrare!!
        console.log("qui check", newFinds)
            setFind(newFinds)
        // console.log("dati arrivati al component", newFinds)
        })
    }, [])

    return ( 
        <div>
            <h2>Find people</h2>
            <br />
                <p>Are you looking for someone?</p>
                <input type="text" value={search} onChange={handleFinds} />
                <div className="lastThree">
                    {newFinds.map((newFind) => (
                    <div className="utente" key={newFind.id}>
                        <div>
                        <img src={newFind.image} />
                        </div>
                        <div>
                        <h3>{newFind.first} {newFind.last}</h3>
                        </div>
                    </div>))}
                </div>
        </div>
    )
}
