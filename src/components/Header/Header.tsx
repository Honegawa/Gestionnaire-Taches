import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/context/AuthContext';
import "./style.css";

const Header = () => {

    const { user, disconnect } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDisconnect = () => {
        disconnect();
        navigate('/');
    }
    
    console.log('heheh', user);

    return (
        <header className="header">
            <nav className="header__links">

                {user ?
                    (
                        <>
                            Bienvenue, {user.email} !
                            <button onClick={handleDisconnect}>Se Deconnecter</button>
                        </>
                    ) : (
                        <>
                            Vous n'êtes pas connecté !
                        </>
                    )
                }
                
            </nav>
        </header>
    );
};

export default Header;