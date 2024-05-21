import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import HTTPClient from "../../utils/HTTPClient"
import "./RegisterForm.css"
import { Context } from "../../PageRouter"

const RegisterForm = () => {
    const {setUser} = useContext(Context)
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let flag = true
        let errors = {}
        if(!data.password){
            errors.password = "Required password"
            flag = false
        }else if(data.password.length < 5){
            errors.password = "The password must be at least 5 characters long"
            flag = false
        }
        if (data.password && data.password2 && data.password !== data.password2){
            errors.password = "Passwords are not the same"
            flag = false;
        }
        if(!data.email){
            errors.email = "Required email"
            flag = false
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)){
            errors.email = "Invalid email address"
            flag = false
        }
        
        setErrors(errors)
        return flag
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!validate()){
            console.log(errors)
            return
        }
        let client =  new HTTPClient()
        client.register(data)
            .then(res => {
                const {id, userName} = res.data.user
                setUser({logged: true, id: id, userName: userName})
                
                console.log("Successful registration")
                navigate("/home")
            })
            .catch(err => {
                if(err.response){
                    setErrors(err.response.data.errors)
                }
                console.log(err)
            })
    }

    return(
        <div className="custom-register-form rounded flex flex-col justify-center items-center shadow-md bg-gray-800 bg-opacity-70">
            <h1 className="text-2xl mb-4 text-white">Registrarse</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-2 flex flex-col">
                    <label htmlFor="userName" className="text-white">Nombre de usuario </label>
                    {errors.userName && <small className="text-red-800 text-sm">{errors.userName}*</small>}
                    <input
                        className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                        type="name" name="userName" value={data.userName || ""} onChange={handleChange} required={true} 
                    />
                </div>
                <div className="mb-2 flex flex-col">
                    <label htmlFor="email" className="text-white">Correo </label>
                    {errors.email && <small className="text-red-800 text-sm">{errors.email}*</small>}
                    <input
                        className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                        type="email" name="email" value={data.email || ""} onChange={handleChange} required={true} 
                    />
                </div>
                <div className="mb-2 flex flex-col">
                    <label htmlFor="password" className="text-white">Contraseña </label>
                    {errors.password && <small className="text-red-800 text-sm">{errors.password}*</small>}
                    <input
                        className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                        type="password" name="password" value={data.password || ""} onChange={handleChange} required={true} minLength={5} 
                    />
                </div>
                <div className="mb-8 flex flex-col">
                    <label htmlFor="password2" className="text-white">Confirmar contraseña </label>
                    {errors.password2 && <small className="text-red-800 text-sm">{errors.password2}*</small>}
                    <input
                        className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-full"
                        type="password" name="password2" value={data.password2 || ""} onChange={handleChange} required={true} minLength={5} 
                    />
                </div>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-28 rounded" type="submit">Registrarse</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;