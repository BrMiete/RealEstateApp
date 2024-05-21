import { useEffect, useState } from "react";
import HTTPClient from "../../utils/HTTPClient";
import PropertyCard from "../PropertyCard/PropertyCard";

const PropertyList = ({availableFor, results}) => {
    const [properties, setProperties] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        let client = new HTTPClient()
        client.getEstatesByAvailableFor(availableFor)
            .then(res => {
                setProperties(res.data)
                if(results){
                    results(res.data.length)
                }
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [availableFor])

    return(
        <div className="flex flex-wrap">
            {loaded && properties.map((property, idx) => {
                return <div key={idx} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                        <PropertyCard property={property} />
                    </div>
            })}
        </div>
    );
}

export default PropertyList