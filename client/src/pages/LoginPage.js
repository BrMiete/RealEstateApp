import { useContext } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { Context } from "../PageRouter";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import HousePic from '../images/BackgroundPic.jpg'

const LoginPage = () => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className='h-screen bg-cover bg-no-repeat bg-center bg-opacity-90' style={{ backgroundImage: `url(${HousePic})` }}>
            <div className='bg-gray-800 bg-opacity-50 h-full'>
                <Navbar />
                <div className="mt-8">
                    <div className="w mx-auto flex flex-col justify-between">
                        <div className="mb-16 flex justify-center">
                            <h1 className="text-4xl text-white">Mi Cuenta</h1>
                        </div>
                        { !user.logged?
                            <div className="flex justify-around min-h-96">
                                <RegisterForm />
                                <LoginForm />
                            </div>
                            : <div className="text-white text-center">
                                <h1 className="text-3xl mb-4">You are now logged in.</h1>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate("/home")}>
                                    Go to home
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;