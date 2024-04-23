import { useContext, useState } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { User } from './../../interfaces/user.ts';
import { useNavigate } from 'react-router-dom';

function SignIn() {

    const [user, setUser] = useState( {} );
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser( (user: User) => ( { ...user, [name]: value } ))
    };

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const isLogged = await login(user);

      console.log(isLogged);
      if (isLogged == true)
        navigate('/dashboard');
      else
        alert('Vos identifiants sont incorrects !');
    }

  return (
    <>
      <h1>Formulaire de connexion :</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email :</label>
        <input type="text" name="email" onChange={handleChange} required />
        <label htmlFor="password">Mot de passe :</label>
        <input type="password" name="password" onChange={handleChange} required />
        <button>Se connecter</button>
      </form>
    </>
  )
}

export default SignIn