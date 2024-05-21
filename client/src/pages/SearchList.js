import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HTTPClient from "../utils/HTTPClient";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import Navbar from '../components/Navbar/Navbar';
import HousePic from '../images/BackgroundPic.jpg';

const SearchDetail = () => {
    const {availableFor, city} = useParams();
    const [results, setResults] = useState(0);
    const [properties, setProperties] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        let client = new HTTPClient()
        client.getEstateByCityAndAvailableFor(city, availableFor)
            .then(res => {
                console.log(res.data)
                setProperties(res.data)
                setResults(res.data.length)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [city, availableFor])

    return(
        <div className='bg-cover bg-no-repeat bg-center bg-fixed bg-opacity-90' style={{ backgroundImage: `url(${HousePic})` }}>
            <div className='bg-gray-800 bg-opacity-50 h-full'>
                <div>
                    <Navbar
                        section='buscar'
                    />
                </div>
                <div className="mt-4 h-screen">
                    <div className="w rounded mx-auto flex flex-col bg-gray-800 bg-opacity-70 p-4">
                        <p className='text-white'>Búsqueda en {city.replace("-", " ").toUpperCase()} para {availableFor === "sale" ? "COMPRAR" : "ALQUILAR"}</p>
                        <p className="text-xl text-white">Mostrando {results} resultado(s)</p>
                        {
                            properties.length === 0 ? 
                            <div className="pt-8">
                                <div className="w rounded h-full mx-auto p-4 text-center">
                                    <h1 className="text-4xl mb-8 text-center text-white">No hay propiedades que coincidan con tu búsqueda</h1>
                                </div>
                            </div>
                            :
                            <div className="flex flex-wrap">
                                {loaded && properties.map((property, idx) => {
                                    return <div key={idx} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                                                <PropertyCard property={property} />
                                            </div>
                                    })}
                            </div>
                        }
                        <div className="text-right">
                            <button className="w-max mr-12 py-2 px-4 rounded shadow-md text-white bg-blue-500 hover:bg-blue-600 text-lg" onClick={(e) => navigate("/buscar")}>Realizar otra búsqueda</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchDetail;