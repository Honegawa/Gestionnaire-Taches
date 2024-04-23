import { createContext, useState, useEffect } from 'react';
import { URL } from '../constants/url.ts';
import axios from 'axios';
import { User } from './../../interfaces/user.ts';

export const AuthContext = createContext();
// export const TodoContext = React.createContext<TodoContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children } ) =>
// const TodoProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
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
                localStorage.setItem('user', JSON.stringify(user));
                console.log(data);
                setLoading(false);
                return true;
            }

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
            <AuthContext.Provider value={ { login, disconnect, user, loading, setLoading } }>
                {children}
            </AuthContext.Provider>
        </>
    )
}