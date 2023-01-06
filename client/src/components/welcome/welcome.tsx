import { Registration } from "../registration/registration";
import { Logo } from "../logo/logo"
// import { Login } from "../login/login"
// import { BrowserRouter, Routes, Route } from "react-router-dom";


export function Welcome() {
    return <div>
                <Logo />
                <Registration />
            </div>

 
}


{/* <div>
<h1>WELCOME</h1>
<h2>Sign up and have fun!</h2>
</div>
<div>
<BrowserRouter>
<Routes>
<Route exact path="/" element={<Registration />}>
</Route>
<Route path="/login" element={<Login />}>
</Route>
</Routes>
</BrowserRouter>
</div> */}