import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import banner1 from "../../assets/bannerps5.jpg";
import banner2 from "../../assets/bannerxbox.jpg";
import banner3 from "../../assets/banner3.PNG";

import CardProduct from "../../components/CardProduct";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(""); 
  const [search, setSearch] = useState('');

  const banners = [
    banner1,
    banner2,
    banner3,
    
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produto", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const filteredProducts = products.filter((product) =>
    (selectedBrand ? product.brand === selectedBrand : true) &&
    (search ? product.model.toLowerCase().includes(search.toLowerCase()) : true)
  );

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <NavBar />

      <div
        className="relative flex-col flex justify-center bg-cover bg-center xl:aspect-[16/7] aspect-[16/10] py-32 transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${banners[currentBanner]})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="lg:mx-32 sm:mx-16 mx-8 text-center">
          
        </div>
      </div>

      <section className="px-20 py-16 bg-gray-800">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Jogos</h1>

          <select
            name="brand"
            id="brand"
            className="px-6 py-2 rounded-lg text-black"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Todas as Marcas</option>
            <option value="Playstation">Playstation</option>
            <option value="Xbox">Xbox</option>
           
          </select>
        </div>
        <p className="text-gray-300 text-sm">Explore nossos jogos selecionados para você!</p>

        <form className="flex items-center mt-8 mb-12">
          <div className="relative w-full">
            <input
              onChange={(e) => setSearch(e.target.value)}
              required=""
              placeholder="Buscar jogos..."
              className="bg-gray-700 text-white outline-none border-none px-4 py-2 rounded-lg w-full placeholder-gray-400 focus:ring-4 focus:ring-indigo-500"
              id="search"
              type="text"
            />
            <button
              onClick={() => setSearch('')} 
              className="absolute inset-y-0 right-0 flex items-center pe-3 text-white"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" className="w-5 h-5">
                <path d="M15 15l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        </form>

        <div className="grid grid-cols-3 gap-16">
          {filteredProducts.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
