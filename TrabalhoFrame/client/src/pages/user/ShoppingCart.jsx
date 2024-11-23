import React, { useEffect, useState } from "react";
import ItemCart from "../../components/ItemCart";
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';

const ShoppingCart = () => {
  const [itemsCart, setItemsCart] = useState([]);
  const userID = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cart/${userID}`);
        if (!response.ok) throw new Error("Erro ao buscar itens no carrinho");
        
        const data = await response.json();
        if (!data || data.length === 0) {
          setItemsCart([]); // Garantir que o estado seja limpo se não houver itens
          return;
        }

        const productIds = data.map((item) => item.productId);
        const products = await fetchProducts(productIds);
        
        const items = data.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return product ? { ...product, quantity: item.quantity } : null;
        }).filter(Boolean);

        setItemsCart(items);
      } catch (error) {
        console.error("Erro ao buscar dados do carrinho:", error.message);
      }
    };

    const fetchProducts = async (productIds) => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const allProducts = await response.json();
        return allProducts.filter((product) => productIds.includes(product.id));
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error.message);
        return [];
      }
    };

    if (userID) fetchItems();
  }, [userID]);

  const handleUpdateItem = (productId, newQuantity) => {
    if (newQuantity <= 0) return; // Impede que a quantidade seja menor ou igual a 0

    setItemsCart((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    updateItemQuantityOnServer(productId, newQuantity);
  };

  const updateItemQuantityOnServer = async (productId, quantity) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${userID}/${productId}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      if (!response.ok) console.error("Erro ao atualizar item no carrinho");
    } catch (error) {
      console.error("Erro ao atualizar item no servidor:", error.message);
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${userID}/${productId}/delete`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setItemsCart((prevItems) => prevItems.filter((item) => item.id !== productId));
      } else {
        console.error("Erro ao deletar item do carrinho");
      }
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error.message);
    }
  };

  const calculateTotal = () => {
    return itemsCart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  async function createOrder() {
    try {
      if (itemsCart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }

      const productIds = itemsCart.map(item => item.id);
      const totalPrice = calculateTotal();

      const response = await fetch(`http://localhost:3000/order/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userID, productIds, totalPrice })
      });

      if (!response.ok) {
        throw new Error("Erro ao confirmar pedido");
      }

      const data = await response.json();
      console.log("Pedido confirmado:", data);

      if (data) {
        setItemsCart([]);
        navigate(`/payment`, { state: { orderId: data.id, totalPrice } });
      }
    } catch (error) {
      console.error("Falha ao confirmar o pedido:", error.message);
    }
  }

  return (
    <div className="bg-gray-200">
      <NavBar />
      <section className="py-24 relative">
        <div className="lg:max-w-7xl 2xl:px-0 lg:px-8 px-16 mx-auto">
          <h2 className="title font-bold text-3xl leading-10 mb-8 text-green-600 max-lg:text-center">
            Meu Carrinho
          </h2>
          <div className="mt-16 gap-32">
            {itemsCart.length > 0 ? (
              itemsCart.map((product) => (
                <ItemCart
                  key={product.id}
                  userID={userID}
                  product={product}
                  onDelete={() => handleDeleteItem(product.id)}
                  onUpdate={handleUpdateItem}
                />
              ))
            ) : (
              <p className="text-green-600">Seu carrinho está vazio.</p>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between lg:px-6 pb-6 border-b border-gray-300 max-lg:max-w-lg max-lg:mx-auto">
            <h5 className="text-green-600 font-semibold text-xl leading-9 w-full max-md:text-center max-md:mb-4">
              Total
            </h5>
            <h6 className="font-bold text-3xl lead-10 text-green-600">
              R$ {calculateTotal().toFixed(2)}
            </h6>
          </div>
          <div className="max-lg:max-w-lg max-lg:mx-auto">
            <button
              onClick={createOrder}
              className="w-full rounded-full mt-8 py-4 bg-green-600 text-white font-semibold text-lg text-center transition-all duration-500 hover:bg-green-700"
            >
              Confirmar Compra
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;
