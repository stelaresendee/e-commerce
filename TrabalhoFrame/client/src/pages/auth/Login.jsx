import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from "../../assets/logo2.webp";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      });
  
      const data = response.data;
      console.log('Response from API:', data);
      localStorage.setItem("userId", data.ID);
      localStorage.setItem("userRole", data.role);
      console.log(localStorage.getItem("userId"));
      console.log(localStorage.getItem("userRole"));
  
      if (!data.token) {
        console.error('Token não encontrado na resposta.');
        return;
      }
  
      localStorage.setItem('token', data.token);
      if (data.userId) {
        localStorage.setItem('userId', data.id);
        localStorage.setItem("userRole", data.role);
      }
  
      console.log('User Role:', data.role); 
   
      if (data.role === "admin") {
        console.log('Navegando para /admin');
        navigate('/admin');
      } else {
        console.log('Navegando para /');
        navigate('/home');
      }
  
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <>
      <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-800">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            
            src={logo}
            className="mx-auto h-30 w-30"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-green-600">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-green-600"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full outline-none px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-zinc-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-green-600"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md outline-none px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-zinc-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-700">
            Ainda não possui uma conta?{" "}
            <Link
              to="/register"
              className="font-semibold text-green-600 hover:text-green-500"
            >
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
