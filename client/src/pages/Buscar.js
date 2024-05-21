import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import HousePic from '../images/BackgroundPic.jpg'

const Buscar = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        city: "",
        availableFor: ""
    });
    const [validateErrors, setValidateErrors] = useState({});

    const validate = () => {
        let flag = true;
        let error = {};

        if (searchData.city.length === 0) {
            error.city = "Debe ingresar una ciudad";
            flag = false;
        }

        if (searchData.availableFor.length === 0) {
            error.availableFor = "Debe elegir una opción";
            flag = false;
        }

        setValidateErrors(error);
        console.log("Errores: ", error);
        return flag;
    }

    const handleCity = (event) => {
        setSearchData({
            ...searchData,
            city: event.target.value.replace(" ","-").toLowerCase()
        });
    }

    const handleAvailableFor = (event) => {
        setSearchData({
            ...searchData,
            availableFor: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Datos: ", searchData);
        
        if (!validate()){
            return
        }

        navigate("/buscar/" + searchData.availableFor + "/" + searchData.city);
    }

    return (
        <div className='bg-cover bg-no-repeat bg-center bg-fixed bg-opacity-90' style={{ backgroundImage: `url(${HousePic})` }}>
            <div className='bg-gray-800 bg-opacity-50 h-screen'>
                <div>
                    <Navbar
                        section='buscar'
                    />
                </div>
                <div className="text-right text-9xl mt-12 mr-12">
                    <h1 className='text-white'>Nosotros te<br/>podemos<br/>ayudar!</h1>
                </div>
                <div className='w-2/4 h-40 min-w-min fixed bottom-16 left-12 text-white rounded bg-gray-800 bg-opacity-70 px-6'>
                    <form onSubmit={handleSubmit} className='h-full flex justify-around items-center gap-x-2'>
                        <div className='w-56 h-min flex flex-col justify-around gap-y-4'>
                            <h1 className='text-lg font-bold mt-2'>Ubicación</h1>
                            <input type='text' name='city' placeholder='Ciudad' onChange={(event) => {handleCity(event)}}className='text-black w-52 border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500'></input>
                            {validateErrors.city && <p className='text-red-500 font-bold'>*{validateErrors.city}</p>}
                        </div>
                        <div className='w-56 h-min flex flex-col justify-around gap-y-4'>
                            <h1 className='text-lg font-bold mt-2'>Disponibilidad</h1>
                            <select defaultValue="none" onChange={(event) => {handleAvailableFor(event)}} className='text-black w-52 border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500'>
                                <option value="none" hidden>Elige uno</option>
                                <option value="sale">Comprar</option>
                                <option value="rent">Alquilar</option>
                            </select>
                            {validateErrors.availableFor && <p className='text-red-500 font-bold'>*{validateErrors.availableFor}</p>}
                        </div>
                        <div>
                            <button type='submit' className="h-max bg-blue-600 hover:bg-blue-700 text-xl text-white font-bold py-3 px-6 mr-4 rounded">Buscar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Buscar;