import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import CardOrders from '../../components/CardOrders';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem("userRole");
  console.log(role);
  
  useEffect(() => {
    
    const fetchOrders = async () => {
    try {
      let response;
      
      if (role === "admin") {
        response = await fetch(`http://localhost:3000/order/`);  
      } else {
        response = await fetch(`http://localhost:3000/order/user/${userId}`);
      }
      if (!response.ok) throw new Error('Erro ao buscar pedidos');

      const data = await response.json();
      setOrders(data);
      console.log(orders)
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

    if (userId) fetchOrders();
  }, [userId]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setProducts(data);
        console.log(data)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white text-gray-900">
      <NavBar />
      <div className="pt-32 mx-32">
        <h1 className="text-2xl font-semibold pb-1">Meus Pedidos</h1>
        <p className="mb-16 text-sm">Histórico de todas as suas compras!</p>
        <div className="grid grid-cols-2 gap-4">
          
          {orders.length > 0 ? (
            orders.map(order => {
              const orderProducts = products.filter(product =>
                order.productIds.includes(product.id)
              );

              return <CardOrders key={order.id} order={order} products={orderProducts} />;
            })
          ) : (
            <p>Você não possui pedidos ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
