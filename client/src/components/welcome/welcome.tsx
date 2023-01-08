import { Registration } from "../registration/registration";
import { Logo } from "../logo/logo"
import { Login } from "../login/login"
import { ResetPassword } from "../reset/resetpassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export function Welcome() {
    return  <div>
        <div>
            <Logo />
        </div>
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/reset" element={<ResetPassword />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/" element={<Registration />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
        </div>
 
}


