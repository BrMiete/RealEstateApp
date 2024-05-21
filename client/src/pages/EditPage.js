import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import { useContext, useEffect, useState } from 'react'
import MapLocation from '../components/MapLocation/MapLocation'
import HTTPClient from '../utils/HTTPClient'
import { Context } from '../PageRouter'
import HousePic from '../images/BackgroundPic.jpg'

const EditPage = () => {
    const {user} = useContext(Context)
    const {id} = useParams()
    const [publicationData, setPublicationData] = useState({})
    const [file, setFile] = useState()
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        let client = new HTTPClient()

        client.getEstate(id)
            .then(res => {
                setPublicationData(res.data)
                setLoaded(true)
                console.log("Propiedad: ", res.data)
            })
            .catch(err => console.log(err))
    },[])
    const handleChange = e => {
        setPublicationData({
            ...publicationData,
            [e.target.name]: e.target.value
        });
    }

    const handleImageChange = e => {
        setFile(e.target.files[0])
    }

    const handleCity = (event) => {
        setPublicationData({
            ...publicationData,
            city: event.target.value.replace(" ","-").toLowerCase()
        })
    }

    const handlePhoneNumber = (event) => {
        let phone = event.target.value.replace(/^(\d{4})(\d{3})(\d{3})/, '$1-$2-$3');
        setPublicationData({
            ...publicationData,
            phoneNumber: phone
        })
    }

    const handleChangeAvailableFor = e => {
        setPublicationData({
            ...publicationData,
            availableFor: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(!user.logged){
            navigate('/login');
        }else{
            let client = new HTTPClient();
            if(!file){
                client.updateEstate(id, publicationData)
                    .then(res => {
                        if(res.status === 200){
                            window.alert("Publicación actualizada correctamente!")
                            navigate('/mis-publicaciones');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }else{
                const formData = new FormData()
                formData.append('file', file)
                client.publishImage(formData)
                    .then(res => {
                        const imageUrl = res.data.imageUrl;
                        const updatedPublicationData = {
                            ...publicationData,
                            image: `http://localhost:8000/static/${imageUrl}`
                        };
                        client.updateEstate(id, updatedPublicationData)
                        .then(res => {
                            if(res.status === 200){
                                window.alert("Publicación actualizada correctamente!")
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
    }

    return (
        <div className='h-screen bg-cover bg-no-repeat bg-center bg-fixed bg-opacity-90' style={{ backgroundImage: `url(${HousePic})` }}>
            <div className='overflow-auto bg-gray-800 bg-opacity-50 h-screen'>
                <Navbar />
                {!loaded ?
                <div>
                    <h1>Cargando...</h1>
                </div>
                :
                <div className="w rounded mx-auto bg-gray-800 bg-opacity-70 mt-8 flex flex-col items-center p-8">
                    <h1 className="text-4xl text-white pb-8">Editar Publicación</h1>
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
                                    <p className="text-white">Ubicación:</p>
                                    <div className="mr-4 mb-4">
                                        <MapLocation latLng={publicationData.coordinates} setLatLng={e => setPublicationData({
                                            ...publicationData,
                                            coordinates: e
                                        })}/>
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
                                                onChange={handleImageChange}/>
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
                                                type="number" name="price" id="price" required={true} min={1000}
                                                value={publicationData.price} onChange={handleChange}/>
                                        </td>
                                    </tr>
                                </div>
                                <div className="flex flex-row justify-end items-end">
                                    <button type="submit" className="h-max bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 mr-4 rounded">Guardar</button>
                                    <button onClick={(e) => {navigate("/mis-publicaciones")}} className="h-max bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                }
            </div>
        </div>
    );
}

export default EditPage;