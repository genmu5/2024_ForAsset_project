import {BrowserRouter, Routes, Route} from "react-router-dom";
import CustomerPage from "./pages/CustomerPage";
import ManagerPage from "./pages/ManagerPage";
import MainPage from "./pages/MainPage";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage />}/>
                <Route path='/customer' element={<CustomerPage/>}/>
                <Route path='/manager' element={<ManagerPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
