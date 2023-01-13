import {useState, useEffect} from 'react';

export function FindPeople ({first, last}) {
    console.log(first, last)

    const [ find, setFind ] = useState("")

    useEffect(() => {
        fetch("/users")
        .then(res => res.json())
        .then(data => 
            console.log(data))
    }, [])

    return ( <div>
            <h2>Find people</h2>
            <br />
            <p>Are you looking for someone?</p>
            <input name="find" type="text" onChange={(evt) => setFind(evt.target.value)} />
        </div>
    )


}
