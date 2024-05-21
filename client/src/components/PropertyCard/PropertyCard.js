import {useNavigate} from "react-router-dom";

const PropertyCard = ({property}) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        if(property.availableFor==="sale"){  
            navigate(`/comprar/${property._id}`)
        }else{
            navigate(`/alquilar/${property._id}`)
        }
    }

    const UpperCaseCity = (city) => { //Primera letra de cada palabra en mayúsculas
        let result = city.replace("-", " ");
        let words = result.split(" ");
        for (let i=0; i<words.length; i++){
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        result = words.join(" ");
        return result;
    }

    return(
        <div className="border rounded border-gray-800 overflow-hidden shadow-2xl flex flex-col mb-4 bg-gray-800 bg-opacity-70 p-4 text-white">
            <div className="h-40 overflow-hidden">
                <img className="hover:object-scale-down object-cover w-full h-full" src={property.image} alt={property.title}/>
            </div>
            <div className="p-2">
                <h2 className="text-lg font-semibold mb-2">{property.title}</h2>
                <h2 className="font-semibold mb-2">{property.address}</h2>
                <h2 className="font-semibold mb-2">{UpperCaseCity(property.city)}</h2>
            </div>
            <div className="flex p-2 justify-between items-center">
                <p className="text-blue-600">{property.price}$</p>
                <button className="bg-blue-800 hover:bg-blue-900 font-bold py-1 px-4 rounded" onClick={handleClick}>Ver más</button>
            </div>
        </div>
    );
} 

export default PropertyCard;