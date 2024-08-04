import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

const OAuth2 = () => {

    const {accessToken} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(!accessToken) return;
        localStorage.setItem("token", accessToken);
        navigate('/');
    }, [accessToken, navigate]);

    return(
        <></>
    )
};

export default OAuth2;