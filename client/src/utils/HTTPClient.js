import axios from "axios"

class HTTPClient {
    constructor(){
        this.instance = axios.create({
            baseURL: "http://localhost:8000/api/",
            withCredentials: true,
        })
    }

    login(email, password){
        return this.instance.post("/login", {
            email,
            password
        })
    }

    register(data){
        return this.instance.post("/register", data)
    }

    logout(){
        return this.instance.post("/logout")
    }

    getEstate(id){
        return this.instance.get(`/estate/${id}`)
    }

    getEstatesByAvailableFor(availableFor){
        return this.instance.get(`/estates/available-for/${availableFor}`)
    }

    getEstateByCityAndAvailableFor(city, availableFor){
        return this.instance.get(`/search/${city}/${availableFor}`)
    }

    getEstatesByOwner(owner){
        return this.instance.get(`/estates/owner/${owner}`)
    }

    publishEstate(property){
        return this.instance.post("/estate", property)
    }
    
    publishImage(file){
        return this.instance.post("/upload", file)
    }

    updateEstate(id, property){
        return this.instance.put(`/estate/${id}`, property)
    }

    deleteEstate(id){
        return this.instance.delete(`/estate/${id}`)
    }
}

export default HTTPClient