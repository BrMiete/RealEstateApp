import { useEffect, useState } from "react"
import Navbar from "../components/Navbar/Navbar"
import HTTPClient from "../utils/HTTPClient"
import { useParams, useNavigate } from "react-router-dom"
import MapDetailLocation from "../components/MapDetailLocation/MapDetailLocation"
import HousePic from '../images/BackgroundPic.jpg'

const Detail = () => {
    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let client = new HTTPClient();

        client.getEstate(id)
            .then(res => {
                setData(res.data);
                setLoaded(true);
            })
            .catch(err => console.log(err));

    },[])

const UpperCaseCity = (city) => { //Primera letra de cada palabra en mayúsculas
    let result = city.replace("-", " ");
    let words = result.split(" ");
    for (let i=0; i<words.length; i++){
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    result = words.join(" ");
    return result;
}

    return (
        <div className='h-screen bg-cover bg-no-repeat bg-center bg-fixed bg-opacity-90' style={{ backgroundImage: `url(${HousePic})` }}>
            <div className='bg-gray-800 bg-opacity-50 h-full'>
                <div className="mb-8">
                    <Navbar />
                </div>
                {!loaded? <h1 className="text-center text-3xl pt-8">Cargando...</h1>
                :   <div>
                        <div className="flex justify-center">
                            <div className="p-8 rounded shadow-md mr-4 bg-gray-800 bg-opacity-70">
                                <h1 className="text-3xl mb-4 text-white">{data.title}</h1>
                                <img src={data.image} alt={data.title} className="h-96 max-w-xl rounded-md"/>
                            </div>
                            <div className="rounded flex flex-col justify-between p-8 shadow-md bg-gray-800 bg-opacity-70 text-white">
                                <div>
                                    <MapDetailLocation coordinates={data.coordinates}/>
                                </div>
                                <div className="flex">
                                    <div className="flex-1">
                                        <p>Propietario: {data.owner}</p>
                                        <p className="pb-2">Teléfono: {data.phoneNumber}</p>
                                        <p>Ciudad: {UpperCaseCity(data.city)}</p>
                                        <p>Barrio: {data.neighborhood}</p>
                                        <p>Dirección: {data.address}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="pb-2">{data.description}</p>
                                        <p>Habitaciones: {data.rooms}</p>
                                        <p>Dormitorios: {data.bedrooms}</p>
                                        <p>Baños: {data.bathrooms}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-green-700 text-2xl">{data.price}$</p>
                                    </div>
                                    <div>
                                        <button className="w-24 bg-red-600 hover:bg-red-700 px-2 py-2 rounded-md"
                                        onClick={(event) => {navigate(-1)}}>Atrás</button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                }
            </div>
        </div>
    )
}
export default Detail