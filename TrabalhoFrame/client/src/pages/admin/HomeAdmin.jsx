import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { Link } from 'react-router-dom'
import banner1 from "../../assets/bannerps5.jpg";
import banner2 from "../../assets/bannerxbox.jpg";
import banner3 from "../../assets/banner3.PNG";

import CardProduct from '../../components/CardProduct'

const HomeAdmin = () => {

  const [products, setProducts] = useState([])
  const [currentBanner, setCurrentBanner] = useState(0)

  const banners = [banner1, banner2, banner3] 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products')
        const data = await response.json()
        setProducts(data)
  
      } catch (error) {
        console.error('Erro ao buscar produto', error)
      }
    }
    fetchProducts()
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length)
    }, 5000) 
    return () => clearInterval(interval)
  }, [banners.length])


  
  return (
    <div className='bg-gray-100 text-green-600 bg-gray-800'>
      <NavBar />

      <div className="relative flex-col flex items-center justify-center bg-cover bg-center aspect-[16/6]"  style={{ backgroundImage: `url(${banners[currentBanner]})` }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <h1 className='text-white relative pb-16 text-3xl'></h1>
      </div>

      <section className='xl:px-44 md:px-20 px-16 py-16'>
        <div className='flex justify-between'>
            <h1 className='text-3xl font-medium'>Jogos</h1>
            <Link to='/admin/add' className='px-6 flex items-center gap-4 text-white rounded-md bg-green-600 hover:bg-green-500'>
              <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 512 512">
                <path className='fill-white' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
              </svg>
              <span className='sm:block hidden'>Adicionar produto</span>
            </Link>
        </div>
        <p className='text-gray-600 text-sm mt-1'>Nossos melhores Jogos</p>

        <div className='mt-16 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-16 gap-8'>
          {products.map(product => (
            <CardProduct key={product.id} product={product}/>
          ))}
        </div>
      </section>

    </div>
  )
}

export default HomeAdmin
