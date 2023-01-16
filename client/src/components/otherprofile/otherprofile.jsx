import { useState, useEffect } from 'react';

export function OtherProfile ({ id_prof, handleClick, setOtherprofile, otherprofile }) {

    // const [id_prof, setId_prof] = useState()

    const handleClose = (evt) => {
        setOtherprofile(!otherprofile)
    }
    
    useEffect(() => {
        fetch(`user/${key}`)
        .then(res => res.json())
        .then(newFinds => {
            // console.log("dati arrivati al component", newFinds)
            setFind(newFinds)
        })
    },[otherprofile])

    return ( <div><p>ciao I'm the key={evt.target.id}</p>
    <button onClick={handleClose}>back</button>
    </div>)


}
