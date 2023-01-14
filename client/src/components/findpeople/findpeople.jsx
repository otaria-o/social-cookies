import { useState, useEffect } from 'react';

export function FindPeople ({ first, last }) {
    console.log(first, last)

    const [ finds, setFind ] = useState([])

    useEffect(() => {
        fetch("/users")
        .then(res => res.json())
        .then(data => 
            console.log("dati arrivati al component", data))
    }, [])

    return ( <div>
            <h2>Find people</h2>
            <br />
                <p>Are you looking for someone?</p>
                <input name="find" type="text" onChange={(evt) => setFind(evt.target.value)} />
            <div>
                {/* rendering an array in react */}
                {finds.map((find) => (
                <h3 key={find.id}>{find.last}</h3>))}
            </div>
        </div>
    )
}
