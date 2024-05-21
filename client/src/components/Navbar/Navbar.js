import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../PageRouter';
import RealEstateLogo from '../../images/RealEstateAppWhite.png'

const Navbar = ({section}) => {
    const {user} = useContext(Context)
    const [activeItem, setActiveItem] = useState(0);
    const navigate = useNavigate();

    const navbarItems = [
        {
            name: 'Inicio',
            to: '/home',
            section: 'inicio'
        },
        {
            name: 'Comprar',
            to: '/comprar',
            section: 'comprar'
        },
        {
            name: 'Alquilar',
            to: '/alquilar',
            section: 'alquilar'
        },
        {
            name: 'Buscar',
            to: '/buscar',
            section: 'buscar'
        }
    ]

    useEffect(() => {
        setActiveItem(navbarItems.findIndex((e) => e.section === section));
    }, [section])

    return(
        <div className='bg-gray-800 opacity-85'>
            <div className='text-gray-300 flex justify-between items-center py-4 px-10'>
                <div className='flex-1'>
                    <img className='h-10 cursor-pointer'  onClick={() => {navigate('/home')}} src={RealEstateLogo} alt='Real Estate App'></img>
                </div>
                <div className='flex-1 flex justify-evenly'>
                    {navbarItems.map((item, index) =>
                        <span 
                            className={`cursor-pointer px-3 py-1 rounded transition duration-300 ${activeItem === index ? 'bg-blue-900 hover:bg-blue-800' : 'hover:bg-gray-700'}`} 
                            key={index} onClick={() => {navigate(item.to)}}>{item.name}</span>
                    )}
                </div>
                <div className='flex-1 flex justify-end'>
                    <button 
                        className='px-3 py-1 rounded transition duration-300 hover:bg-gray-700'
                        onClick={() => {user.logged ? navigate("/cuenta") : navigate("/login")}}>
                        {user.logged ? "Mi Cuenta" : "Iniciar Sesión"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;