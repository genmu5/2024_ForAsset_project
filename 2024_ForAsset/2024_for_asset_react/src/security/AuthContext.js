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
        console.log("Attempting to logout");

        // 쿠키와 로컬 스토리지 제거
        document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("token");

        // 카카오 로그아웃 URL로 리디렉션
        const kakaoLogoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=af58e87d3ba72c33283e46a7a8fa2983&logout_redirect_uri=http://localhost:3000`;
        window.location.href = kakaoLogoutUrl;
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
