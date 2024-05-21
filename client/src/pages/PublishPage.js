import { useContext, useEffect, useState } from "react";
import MapLocation from "../components/MapLocation/MapLocation";
import Navbar from "../components/Navbar/Navbar";
import { Context } from "../PageRouter";
import { useNavigate } from "react-router-dom";
import HTTPClient from "../utils/HTTPClient";
import HousePic from '../images/BackgroundPic.jpg';

const PublishPage = () => {
    const {user, latLng, setLatLng} = useContext(Context);
    const [errors, setErrors] = useState({})
    const [file, setFile] = useState();
    const [publicationData, setPublicationData] = useState({
        title: "",
        city: "",
        neighborhood: "",
        description: "",
        owner: user.userName,
        phoneNumber: "",
        address: "",
        coordinates: latLng,
        price: 5000,
        image: "",
        bedrooms: 0,
        bathrooms: 0,
        rooms: 1,
        availableFor: "sale"
    });
    const navigate = useNavigate();

    const handleChangeAvailableFor = e => {
        setPublicationData({
            ...publicationData,
            availableFor: e.target.value
        });
    }

    const handleChange = e => {
        setPublicationData({
            ...publicationData,
            [e.target.name]: e.target.value
        });
    }

    const handleCity = (event) => {
        setPublicationData({
            ...publicationData,
            city: event.target.value
        })
    }

    const handlePhoneNumber = (event) => {
        let phone = event.target.value.replace(/^(\d{4})(\d{3})(\d{3})/, '$1-$2-$3');
        setPublicationData({
            ...publicationData,
            phoneNumber: phone
        })
    }

    const handleImageChange = e => {
        setFile(e.target.files[0])
    }

    const validate = () => {
        let flag = true
        let errors = {}
        if(!latLng || !latLng.lat || !latLng.lng){
            errors.latLng = "Ubicación requerida"
            flag = false
        }
        
        setErrors(errors)
        return flag
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(!validate()){
            console.log(errors)
            return
        }

        if(!user.logged){
            window.alert("Debes registrarte y/o iniciar sesión para realizar una publicación!")
            navigate('/login');
        }else{
            let client = new HTTPClient();

            const formData = new FormData()
            formData.append('file', file)
            client.publishImage(formData)
                .then(res => {
                    const imageUrl = res.data.imageUrl;
                    const updatedPublicationData = {
                        ...publicationData,
                        image: `http://localhost:8000/static/${imageUrl}`,
                        city: publicationData.city.replace(" ","-").toLowerCase() //Reemplazamos los espacios por "-" y
                        //ponemos la ciudad en minúsculas.
                    };
                    client.publishEstate(updatedPublicationData)
                    .then(res => {
                        setLatLng({})
                        if(res.status === 200){
                            window.alert("Publicación exitosa!")
                            navigate('/mis-publicaciones');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    useEffect(() => {
        setPublicationData({
            ...publicationData,
            coordinates: latLng
        })
    },[latLng])

    return (
        <div className='h-screen bg-cover bg-no-repeat bg-center bg-fixed bg-opacity-90' style={{ backgroundImage: `url(${HousePic})` }}>
            <div className='overflow-auto bg-gray-800 bg-opacity-50 h-screen'>
                <Navbar />
                <div className="w rounded mx-auto bg-gray-800 bg-opacity-70 mt-8 flex flex-col items-center p-8">
                    <h1 className="text-4xl text-white pb-8">Publicar</h1>
                    <form className="flex" onSubmit={handleSubmit}>
                        <div>
                            <div className="rounded flex flex-col justify-start shadow-md mr-16 p-8 bg-gray-800 bg-opacity-70">
                                <h1 className="text-3xl text-center mb-4 text-white" onClick={()=>console.log(publicationData)}>Detalles Generales</h1>
                                <div>
                                    <tr>
                                        <td className="text-white">Título:</td> 
                                        <td className="pl-2 py-2">
                                            <input  
                                                className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                                                type="text" name="title" id="title" placeholder="Título" required={true} minLength={5}
                                                value={publicationData.title} onChange={handleChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-white">Ciudad:</td> 
                                        <td className="pl-2 pb-2">
                                            <input  
                                                className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                                                type="text" name="city" id="city" placeholder="Ciudad" required={true}
                                                value={publicationData.city} onChange={(event) => {handleCity(event)}}/>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td className="text-white">Barrio:</td> 
                                        <td className="pl-2 pb-2">
                                            <input  
                                                className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                                                type="text" name="neighborhood" id="neighborhood" placeholder="Barrio" required={true}
                                                value={publicationData.neighborhood} onChange={handleChange}/>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td className="text-white">Dirección:</td> 
                                        <td className="pl-2 pb-2">
                                            <input  
                                                className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                                                type="text" name="address" id="address" placeholder="Calle/Dirección" required={true}
                                                value={publicationData.address} onChange={handleChange}/>
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td className="text-white">Descripción:</td> 
                                        <td className="pl-2">
                                            <input  
                                                className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                                                type="text" name="description" id="description" placeholder="Breve descripción" required={true} minLength={20} maxLength={200}
                                                value={publicationData.description} onChange={handleChange}/>
                                        </td> 
                                    </tr>
                                </div>
                            </div>
                        </div>
                        <div className="rounded flex flex-col shadow-md p-8 bg-gray-800 bg-opacity-70">
                            <h1 className="text-3xl text-center mb-4 text-white">Detalles de la Propiedad</h1>
                            <div className="flex">
                                <div>
                                    <p className="text-white">Marque la ubicación en el mapa:</p>
                                    {errors.latLng && <small className="text-red-600 text-sm">{errors.latLng}*</small>}
                                    <div className="mr-4 mb-4">
                                        <MapLocation latLng={latLng} setLatLng={e => setLatLng(e)}/>
                                    </div>
                                </div>
                                <div>
                                    <tr>
                                        <td className="text-white">Habitaciones:</td> 
                                        <td className="py-2 pl-2">
                                            <input 
                                                className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                                                type="number" name="rooms" id="rooms" required={true} min={1}
                                                value={publicationData.rooms} onChange={handleChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-white">Dormitorios:</td> 
                                        <td className="pb-2 pl-2">
                                            <input 
                                                className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                                                type="number" name="bedrooms" id="bedrooms" required={true}
                                                value={publicationData.bedrooms} onChange={handleChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-white">Baños:</td> 
                                        <td className="pb-2 pl-2">
                                            <input
                                                className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                                                type="number" name="bathrooms" id="bathrooms" required={true}
                                                value={publicationData.bathrooms} onChange={handleChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-white">Imagen:</td> 
                                        <td className="pl-2">
                                            <input 
                                                className="text-white py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                                                type="file" name="image" id="image" accept="image/*" multiple
                                                onChange={handleImageChange}
                                                required={true} />
                                        </td>
                                    </tr>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <tr>
                                        <td className="text-white">Disponibilidad:</td> 
                                        <td className="pb-2 pl-2">
                                            <select 
                                                onChange={handleChangeAvailableFor} 
                                                className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500"
                                                value={publicationData.availableFor}
                                            >
                                                <option value="sale">Vender</option>
                                                <option value="rent">Alquilar</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-white">Teléfono:</td> 
                                        <td className="pb-2 pl-2">
                                            <input  
                                                className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                                                type="text" name="phoneNumber" id="phoneNumber" placeholder="Teléfono de contacto" required={true} minLength={10} maxLength={10}
                                                value={publicationData.phoneNumber} onChange={handlePhoneNumber}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-white">Precio:</td> 
                                        <td className="pl-2">
                                            <input 
                                                className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                                                type="number" name="price" id="price" required={true} step={500} min={1000}
                                                value={publicationData.price} onChange={handleChange}/>
                                        </td>
                                    </tr>
                                </div>
                                <div className="flex flex-row justify-end items-end">
                                    <button type="submit" className="h-max bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 mr-4 rounded">Publicar</button>
                                    <button onClick={(e) => {navigate(-1)}} className="h-max bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default PublishPage;