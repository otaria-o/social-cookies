import { useState, useEffect } from 'react';

export function FindPeople ({ first, finds, changeFindUsers }) {
    // console.log(first, last)

    const [ search, setSearch] = useState("")
    const [ newFinds, setFind ] = useState([])

    const handleFinds = function(search) {
        setSearch(search)
        console.log("search", search)
        if (search.trim().length > 0) {
        
            fetch("/search", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(
                                    search),
                                    // newFinds: setFind(newFinds)
                                })
                            
                .then(res => res.json())
                .then(newFinds => {
            // changeFindUsers(newFinds)
                    setFind(newFinds)
            // console.log("dati arrivati al component", newFinds)
        })
        }
    }

    useEffect(() => {
        // if (search.trim().length === 0) {
            fetch("/users")
            .then(res => res.json())
            .then(newFinds => {
            // changeFindUsers(newFinds)
                setFind(newFinds)
            // console.log("dati arrivati al component", newFinds)
        })
        // } 
        // else if (search.trim().length > 0) {
        //     console.log("maggiore!")
        //     fetch("/search")
        //     .then(res => res.json())
        //     .then(newFinds => {
        //     // changeFindUsers(newFinds)
        //         setFind(newFinds)
        //     // console.log("dati arrivati al component", newFinds)
        // })
        // }
        // .catch(err => {
        //     console.log("errore dal find people component", err)
        // })
    }, [search])

    return ( <div>
            <h2>Find people</h2>
            <br />
                <p>Are you looking for someone?</p>
                <input name="find" type="text" onChange={(evt) => handleFinds(evt.target.value)} />
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
