import { useContext, useEffect } from "react";
import { Context } from "../PageRouter";
import { useNavigate } from "react-router-dom";
import HTTPClient from "../utils/HTTPClient";
import Navbar from "../components/Navbar/Navbar";
import HousePic from '../images/BackgroundPic.jpg'

const AccountPage = () => {
    const navigate = useNavigate();
    const {user, setUser, setLatLng} = useContext(Context);
    
    useEffect(() => {
        if(!user.logged){
            navigate("/login")
        }
    }, [])

    const handleLogout = (event) => {
        if(window.confirm('Estas seguro que quieres cerrar sesión?')){
            const client = new HTTPClient();
            client.logout()
                .then(res => {})
                .catch(err => {
                    console.log(err)
                });
            setUser({});
            setLatLng({});
            navigate("/home");
        }
    }

    return(
        <div className='h-screen bg-cover bg-no-repeat bg-center bg-fixed bg-opacity-90' style={{ backgroundImage: `url(${HousePic})` }}>
            <div className='bg-gray-800 bg-opacity-50 h-full'>
                <Navbar />
                <div className="pt-8">
                    <div className="w-max rounded mx-auto flex flex-col justify-between bg-gray-800 bg-opacity-70 p-4">
                        <h1 className="text-4xl text-center mb-8 text-white">Mi Cuenta</h1>
                        { user.logged && <div className="flex flex-col ">
                            <div className="text-xl mb-2 p-4 text-white">Nombre de Usuario: {user.userName}</div>
                            <div className="flex flex-col mx-auto text-xl p-4">
                                <button className="mx-auto w-60 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded shadow-md" onClick={(event) => {navigate("/mis-publicaciones")}}>Mis Publicaciones</button>
                                <button className="mx-auto mt-2 w-60 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-2 rounded shadow-md" onClick={(event) => {handleLogout(event)}}>Cerrar Sesión</button>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AccountPage;