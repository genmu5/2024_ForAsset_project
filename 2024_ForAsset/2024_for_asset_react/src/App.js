import {BrowserRouter, Routes, Route} from "react-router-dom";
import CustomerPage from "./pages/CustomerPage";
import ManagerPage from "./pages/ManagerPage";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import AuthProvider from "./security/AuthContext";
import OAuth2 from "./security/OAuth2";

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/signup' element={<SignUpPage/>}/>
                    <Route path='/login' element={<LogInPage/>}/>
                    <Route path='/customer' element={<CustomerPage/>}/>
                    <Route path='/manager' element={<ManagerPage/>}/>
                    <Route path='/auth/oauth-response/:accessToken' element={<OAuth2/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
