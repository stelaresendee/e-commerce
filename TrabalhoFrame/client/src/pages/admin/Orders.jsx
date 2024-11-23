import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar'
import CardOrders from '../../components/CardOrders'

const Orders = () => {
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem("userRole");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/order/");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Erro ao buscar produto", error);
      }
    };
    fetchOrders();
  }, []);

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

            <div className='pt-32 mx-32'>
                <h1 className='text-2xl font-semibold pb-1'>Gerenciar Pedidos</h1>
                <p className='mb-16 text-sm'>Clique no status para mudá-lo!</p>
                <div className='grid grid-cols-2'>
                    {orders.length > 0 ? (
                orders.map(order => {
                  const orderProducts = products.filter(product =>
                    order.productIds.includes(product.id)
                  );

                  return <CardOrders userRole={role} key={order.id} order={order} products={orderProducts} />;
                })
              ) : (
                <p>Você não possui pedidos ainda.</p>
              )}
            </div>
        </div>
    </div>
  )
}

export default Orders
