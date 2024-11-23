import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Payment = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();

  const { orderId, totalPrice } = location.state || {}; 

  const handlePaymentPago = async () => {
    if (!orderId) {
      console.error("Pedido não encontrado!");
      alert("Erro: ID do pedido não encontrado.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/order/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Pago" }),
        }
      );

      // Verifique a resposta da API
      const text = await response.text(); // Lê a resposta como texto
      console.log("Resposta da API:", text); // Verifica o que está vindo da API

      // Se a resposta não estiver vazia, tente parsear
      let data = {};
      if (text) {
        data = JSON.parse(text); // Apenas parseia se a resposta não estiver vazia
      }

      if (response.ok) {
        setIsPaid(true); // Marca o pedido como pago
      } else {
        console.error("Erro no backend:", data.error || "Erro desconhecido");
        alert("Erro ao processar pagamento. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
      alert("Erro ao tentar realizar o pagamento.");
    }
  };

  return (
    <>
      {!isPaid && (
        <>
          <h2>ID do Pedido: {orderId}</h2>
          <h3>Valor Total: R$ {totalPrice}</h3>
          <ol class="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base mx-auto my-16">
            <li class="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <svg
                  class="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Carrinho
              </span>
            </li>

            <li class="after:border-1 flex items-center text-black text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                <svg
                  class="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Pagamento
              </span>
            </li>

            <li class="flex shrink-0 items-center">
              <svg
                class="me-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Confirmação
            </li>
          </ol>
          <div className="font-sans bg-white p-4">
            <div className="max-w-4xl mx-auto">
              {/* Formulário de pagamento */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <form>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Primeiro nome"
                          className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Último nome"
                          className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Telefone"
                          className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-4 mt-12">
                <div class="md:col-span-2">
                  <form>
                    <div class="grid sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Street address"
                          class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="City"
                          class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="State"
                          class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Zip Code"
                          class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-4 mt-12">
                <div class="md:col-span-2">
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div class="flex items-center">
                      <input
                        type="radio"
                        class="w-5 h-5 cursor-pointer"
                        id="card"
                        checked
                      />
                      <label for="card" class="ml-4 flex gap-2 cursor-pointer">
                        <img
                          src="https://readymadeui.com/images/visa.webp"
                          class="w-12"
                          alt="card1"
                        />
                        <img
                          src="https://readymadeui.com/images/american-express.webp"
                          class="w-12"
                          alt="card2"
                        />
                        <img
                          src="https://readymadeui.com/images/master.webp"
                          class="w-12"
                          alt="card3"
                        />
                      </label>
                    </div>

                    <div class="flex items-center">
                      <input
                        type="radio"
                        class="w-5 h-5 cursor-pointer"
                        id="paypal"
                      />
                      <label
                        for="paypal"
                        class="ml-4 flex gap-2 cursor-pointer"
                      >
                        <img
                          src="https://readymadeui.com/images/paypal.webp"
                          class="w-20"
                          alt="paypalCard"
                        />
                      </label>
                    </div>
                  </div>

                  <div class="grid sm:grid-cols-4 gap-4 mt-4">
                    <div class="col-span-2">
                      <input
                        type="number"
                        placeholder="Card number"
                        class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="EXP."
                        class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="CVV"
                        class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-4 mt-12">
                <button
                  onClick={handlePaymentPago} // Chama a função para realizar o pagamento
                  type="button"
                  className="px-16 py-3 text-sm font-semibold tracking-wide bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Confirmar Pagamento
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {isPaid && (
        
        <div className="py-8">
            <Link className="mb-8 mt-8 underline mx-8" to="/home">
            Página inicial{" "}
          </Link>


          <ol class="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500  sm:text-base mx-auto my-16">
            <li class="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                <svg
                  class="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Carrinho
              </span>
            </li>

            <li class="after:border-1 flex items-center  text-gray-500 text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                <svg
                  class="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Pagamento
              </span>
            </li>

            <li class="flex shrink-0 items-center text-black">
              <svg
                class="me-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Confirmação
            </li>
          </ol>


        
          <div className="mt-4 flex flex-col items-center justify-center py-64">
            <p className="text-center text-gray-600 flex gap-2">
              Obrigado,{" "}
              <span className="first-letter:uppercase">{firstName}</span>
            </p>
            <p className="mt-4 text-green-500 text-xl mb-4">
              Pagamento efetuado com sucesso
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28"
              width="28"
              viewBox="0 0 512 512"
              className="mt-2"
            >
              <path
                className="fill-green-500"
                d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
