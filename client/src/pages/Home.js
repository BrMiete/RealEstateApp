import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';
import HousePic from '../images/BackgroundPic.jpg';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='bg-cover bg-no-repeat bg-center bg-fixed bg-opacity-90' style={{ backgroundImage: `url(${HousePic})` }}>
            <div className='bg-gray-800 bg-opacity-50 h-screen'>
                <Navbar
                    section='inicio'
                />
                    <div className="text-9xl mt-12 ml-12">
                        <h1 className='text-white w-max'>Explore las mejores<br/>opciones!</h1>
                    </div>
            </div>
            <div className='w-2/4 min-w-min fixed bottom-12 right-12 flex justify-evenly rounded text-white bg-gray-800 bg-opacity-70 p-4'>
                <div className='w-56 h-56 flex flex-col justify-between'>
                    <h1 className="text-xl font-bold">Comprar</h1>
                    <p>Buscas comprar una<br/>casa o departamento?<br/>Mira las opciones disponibles<br/>para comprar</p>
                    <button className='w-max py-1 px-2 mt-7 bg-gray-800 rounded transition duration-300 hover:bg-gray-900' onClick={(event) => {navigate('/comprar')}}>Comprar →</button>
                </div>
                <div className='w-56 flex flex-col  justify-between'>
                    <h1 className="text-xl font-bold">Alquilar</h1>
                    <p>Buscas alquilar una<br/>casa o departamento?<br/>Mira las opciones disponibles<br/>para alquilar</p>
                    <button className='w-max py-1 px-2 mt-7 bg-gray-800 rounded transition duration-300 hover:bg-gray-900' onClick={(event) => {navigate('/alquilar')}}>Alquilar →</button>
                </div>
                <div className='w-56 flex flex-col  justify-between'>
                    <h1 className="text-xl font-bold">Publicar</h1>
                    <p>Mira las opciones disponibles para vender/alquilar una propiedad</p>
                    <button className='w-max py-1 px-2 mt-7 bg-gray-800 rounded transition duration-300 hover:bg-gray-900' onClick={() => {navigate('/publicar')}}>Publicar →</button>
                </div>
            </div>
        </div>
    );
}

export default Home;