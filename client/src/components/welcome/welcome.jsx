import { Registration } from "../registration/registration";
import { Logo } from "../logo/logo"
import { Login } from "../login/login"
import { App } from "../app/app"
import { ResetPassword } from "../reset/resetpassword";
import { FindPeople } from "../findpeople/findpeople"
import { BrowserRouter, Routes, Route } from "react-router-dom";


export function Welcome() {
    return  <div>
        <div>
            <BrowserRouter>
                <Routes>    
                    <Route path="/reset/pwd" element={<ResetPassword />}></Route>
                    <Route path="/reset" element={<ResetPassword />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/" element={<Registration />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
        </div>
}


