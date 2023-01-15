import { useState, useEffect } from 'react';

export function FindPeople ({ first, finds, changeFindUsers }) {
    // console.log(first, last)

    const [ search, setSearch] = useState("")
    const [ newFinds, setFind ] = useState([])

    useEffect(() => {
        fetch("/users")
        .then(res => res.json())
        .then(newFinds => {
            // changeFindUsers(newFinds)
            setFind(newFinds)
            console.log("dati arrivati al component", newFinds)
        })
    }, [])

    // const handleFinds = function(evt) {
    //     console.log(evt)
    //     setSearch(evt)
    //     fetch("/users", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
                
    //             newFinds: setFind(newFinds)
    //             // errorMessage: this.state.errorMessage
    //         })
    //     })
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(data => {
    //         console.log("dati dalla post del FindPeople component", data); 
    //         // this.props.changeFindUsers()
    //         setFind(data)
    //     })
    //     .catch(err => {
    //         console.log("errore nella fetch!!", err)
    //         // this.setState({ errorMessage: "Sorry, something went wrong. Fill up all the fields, please." })
    //     })
    // }

    // const handleFinds = function(evt) {
    //     console.log(evt)
    //     setSearch(evt)
        // fetch("/users", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
                
        //         newFinds: setFind(newFinds)
        //         // errorMessage: this.state.errorMessage
        //     })
        // })
        // .then(res => {
        //     return res.json();
        // })
        // .then(data => {
        //     console.log("dati dalla post del FindPeople component", data); 
        //     // this.props.changeFindUsers()
        //     setFind(data)
        // })
        // .catch(err => {
        //     console.log("errore nella fetch!!", err)
        //     // this.setState({ errorMessage: "Sorry, something went wrong. Fill up all the fields, please." })
        // })
    // }

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
