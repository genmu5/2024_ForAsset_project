import {BrowserRouter, Routes, Route} from "react-router-dom";
import CustomerPage from "./pages/CustomerPage";
import ManagerPage from "./pages/ManagerPage";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/customer' element={<CustomerPage/>}/>
                <Route path='/manager' element={<ManagerPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
