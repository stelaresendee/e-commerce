import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CardProduct = ({ product }) => {
  const userID = localStorage.getItem("userId");
  const navigate = useNavigate();

  console.log("O ID DO USUARIO É:", userID);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post("http://localhost:3000/cart/add", {
        userId: userID, 
        productId: product.id, 
        quantity: 1,
      });
      console.log(`Product added successfully no id ${userID}`);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error adding product to cart:", error.response.data);
        alert(`Error: ${error.response.data.message || "Unable to add to cart"}`);
      } else if (error.request) {
        console.error("Network error or server did not respond:", error.message);
        alert("Network error: Could not connect to server.");
      } else {
        console.error("Unexpected error:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Evita a propagação para o card
    navigate(`/admin/edit/${product.id}`);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Evita a propagação para o card
    
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:3000/products/delete/${product.id}`);
      console.log("Product deleted successfully:", response.data.message);
      alert("Product deleted successfully!");
      window.location.reload(); 
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error deleting product:", error.response.data);
        alert(`Error: ${error.response.data.message || "Unable to delete product"}`);
      } else if (error.request) {
        console.error("Network error or server did not respond:", error.message);
        alert("Network error: Could not connect to server.");
      } else {
        console.error("Unexpected error:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  };

  const firstImage =
    product.ProductImages && product.ProductImages.length > 0
      ? product.ProductImages[product.ProductImages.length - 1].url
      : product.image;

  const handleCardClick = () => {
    navigate(`/detail/${product.id}`);
  };

  return (
    <div onClick={handleCardClick} className="border boder-gray-200 text-white rounded-xl pb-4">
      <div className="flex justify-end gap-4 my-3 mx-2">
        <svg onClick={handleContextMenu} xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
          <path className="fill-red-600 cursor-pointer" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
        </svg>
        <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
          <path className="fill-red-600 cursor-pointer" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232l144 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-144 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
        </svg>
      </div>
      <img
        className="rounded-2xl object-cover object-center h-80 px-2 w-full "
        src={firstImage}
        alt={product.model}
      />
      <div className="px-4 py-8">
        <h2 className="text-2xl text-zinc-800 font-medium first-letter:uppercase">
          {product.model}
        </h2>
        <p className="text-gray-600 first-letter:uppercase">{product.brand}</p>
        <p className="text-xl text-zinc-900 mt-8 font-semibold">
          R${" "}
          {product.price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className="px-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          className="bg-red-600 rounded-lg w-full py-2 z-10"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
