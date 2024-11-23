import React, { useState } from "react";

const CardOrders = ({ order, products, userRole }) => {
  const [status, setStatus] = useState(order?.status || "Pendente");

  const handleStatusChange = async (event) => {
    // Só permite alterar o status se o usuário for admin
    if (userRole !== "admin") {
      return;
    }

    const newStatus = event.target.value;
    setStatus(newStatus);

    try {
      const response = await fetch(`http://localhost:3000/order/${order.id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao atualizar status:", errorData.message || "Erro desconhecido");
        alert("Erro ao atualizar o status no backend. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao se comunicar com o servidor.");
    }
  };

  if (!order) {
    return <p>Pedido não encontrado.</p>;
  }

  return (
    <div className="border rounded-lg p-8 border-gray-200 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-lg">Pedido #{order.id}</h1>
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={userRole !== "admin"} // Só pode mudar se for admin
          className={`${
            status === "Aguardando Pagamento"
              ? "bg-red-100 text-red-700"
              : status === "Pago"
              ? "bg-green-100 text-green-700"
              : status === "Enviado"
              ? "bg-orange-100 text-orange-700"
              : status === "Entregue"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          } px-4 py-2 flex items-center text-sm rounded cursor-pointer ${userRole !== "admin" ? "cursor-not-allowed opacity-50" : ""}`}
        >
          <option value="Aguardando Pagamento">Aguardando Pagamento</option>
          <option value="Pago">Pago</option>
          <option value="Enviado">Enviado</option>
          <option value="Entregue">Entregue</option>
        </select>
      </div>

      <div>
        {Array.isArray(products) &&
          products.map((product) => {
            const productImage =
              product.ProductImages && product.ProductImages.length > 0
                ? product.ProductImages[0].url
                : null;

            return (
              <div key={product.id} className="flex gap-8 mb-4 border-b pb-4">
                <img
                  className="w-32 h-32 object-cover rounded-md"
                  src={productImage}
                  alt={product.model}
                />
                <div className="flex flex-col justify-between">
                    <h2 className="font-semibold text-lg">{product.model}</h2>
                  <p className="text-gray-600">{product.brand}</p>
                  <span className="font-bold text-red-600">
                    R${" "}
                    {product.price.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            );
          })}
      </div>

      <div className="pt-4">
        <p className="font-semibold text-lg">
          Total:{" "}
          <span className="text-red-600">
            R${" "}
            {order.totalPrice.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CardOrders;
