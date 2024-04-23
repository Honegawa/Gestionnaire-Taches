import { createContext, useState, useEffect } from 'react';
import { URL } from '../constants/url.ts';
import axios from 'axios';
import { User, UserContext } from './../../interfaces/user.ts';

export const AuthContext = createContext<UserContext|null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children } ) =>
{ 
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect( () => {
        initUser();
    }, [] );

    const login = async (dataForm: User) => {

        setLoading(true);

        try {
            const { data, status } = await axios.post(URL.USER_SIGN_IN, dataForm);

            if ( status === 200 ) {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
                console.log(data);
                setLoading(false);
                return true;
            } else
                return false;

        } catch (error) {
            console.log(error);
            setLoading(false);
            return false
        }
    }

    const initUser = () => {
        const localUser = localStorage.getItem('user');
        if ( localUser != null)
            setUser(JSON.parse(localUser));
    }

    const disconnect = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    return (
        <>
            <AuthContext.Provider value={ { login, disconnect, user, loading } }>
                {children}
            </AuthContext.Provider>
        </>
    )
}