import {createContext, useContext, useEffect, useState} from "react";
import {apiClient} from "../api/ApiClient";
import {executeSignIn} from "../api/ApiService";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setAuthenticated(true);
            apiClient.interceptors.request.use((config) => {
                config.headers.Authorization = storedToken;
                return config;
            });
        }
    }, []);

    async function login(email, password) {
        const signInRequestDto = {
            email: email,
            password: password,
        };
        await executeSignIn(signInRequestDto)
            .then(response => {
                if (response.status === 200) {
                    const accessToken = "Bearer " + response.data.accessToken;
                    setAuthenticated(true);
                    setToken(accessToken);
                    localStorage.setItem("token", accessToken);
                    apiClient.interceptors.request.use((config) => {
                        config.headers.Authorization = accessToken;
                        return config;
                    });
                    return true;
                }
            })
            .catch(error => {
                logout();
                return false;
            });
    }

    function logout() {
        setAuthenticated(false);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("memberEmail");
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
