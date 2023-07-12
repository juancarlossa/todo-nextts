import { useEffect, useState } from 'react';
import axios from 'axios';
import { signIn, getSession, useSession } from 'next-auth/react';
import GoogleLogin from './components/GoogleLogin';
import { redirect } from 'next/dist/server/api-utils';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { data: session, status: loading } = useSession();
  const router = useRouter();


  
  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });
      // Manejar la respuesta y redirigir o realizar acciones adicionales
    } catch (error) {
      setErrorMessage('Credenciales inválidas');
    }
  };

    if (session) {
      console.log("LOGGED IN")
    } else {
      console.log("LOGGED out")
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-gray-800">Iniciar sesión en Notion</h1>
            </div>
            <div className="bg-white rounded-md shadow-md px-8 py-6">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                onClick={handleLogin}
              >
                Iniciar sesión
              </button>

              <div>

                <GoogleLogin session={session}/>
              </div>
            </div>
          </div>
        </div>
      );
    };
  }

export default Login;

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
  const session = await getSession(context);
  if (session) {
    const { user } = session;
    return {
      redirect: {
        destination: `/${user?.name}`,
        permanent: false, // Opcional, indica si la redirección es permanente o temporal
      },
    };
  }
  return {
    props: { session },
  };
};


