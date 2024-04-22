import { useState } from 'react';
import axios from 'axios';
import {URL} from '../utils/constants/url.ts';
import {User} from '../interfaces/user.ts'; 

function PageSignUp() {

    const [user, setUser] = useState(
        {
            email: '',
            password: '',
        }
    )

    const handleChange = (event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => { // Si plusieurs type mettre un |
        const { name, value } = event.target;
        setUser( (user: User) => ( { ...user, [name]: value } ) );
    };

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => { // React.FormEvent
        event.preventDefault();

        try {
            const response = await axios.post(URL.USER_SIGN_UP, user)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1>Page Ajout Utilisateur</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Nom :</label>
                <input type="text" onChange={handleChange} />

                <label htmlFor="password">Mot de passe :</label>
                <input type="password" onChange={handleChange} />

                <button>S'Inscrire</button>
            </form>
        </>
    );
}

export default PageSignUp