import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [deviceId, setDeviceId] = useState('11111111');
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log('handleSubmit dipanggil');
      const response = await axios.post(
        'http://sandbox.mkpmobile.com:18080/parking/local/user/login',
        {
          username,
          password,
          deviceId,
        },
      );

      if (response.data.success) {
        const token = response.data.result.token;
        // console.log('Token:', token);
        setToken(token);
        setLoggedIn(true);
        localStorage.setItem('token', token);
        toast.success('Login berhasil!');
        setTimeout(() => {
          navigate('/form', { replace: true });
        }, 2500);
      } else {
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Login gagal. Silakan periksa username dan password Anda.');
      // toast.error('Terjadi kesalahan saat login. Silakan coba lagi nanti.');
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="flex justify-center items-center">
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={handleFormSubmit}
        className="bg-gray-100 shadow-xl rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            required
            placeholder="*************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <button
            className="w-full text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
