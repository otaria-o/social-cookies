import { useState, useEffect } from 'react';
// import { useParams } from "react-router";

export function OtherProfile ({ otherUserId }) {

    const [ otherprofile, setOtherprofile ] = useState(true)
    // const { otherUserId } = useParams()
    // // const [id_prof, setId_prof] = useState()
    // console.log(otherUserId)
    
    const handleClose = (evt) => {
        setOtherprofile(!otherprofile)
    }
    
    useEffect(() => {
        fetch(`user/${otherUserId}`)
        .then(res => res.json())
        .then(data => {
            console.log("data dello user clickato", data)
        })
    },[otherprofile])

    return ( <div>
        {otherprofile &&
        <div>
        <p>ciao I'm the key={otherUserId}</p>
    <button onClick={handleClose}>back</button>
    </div>
        }
    </div>)


}
