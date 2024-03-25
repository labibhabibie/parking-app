import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ArrowLeftEndOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Logo from '../../../assets/logo.svg';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';

const path = window.location.pathname;
// const location = useLocation();
// const key = location.key;
// console.log(key);
const navigation = [
  { name: 'Home', href: '/', current: path == '/' ? true : false },
  // {
  //   name: 'Dashboard',
  //   href: '/dashboard',
  //   current: path == '/dashboard' ? true : false,
  // },
  {
    name: 'Form Registrasi',
    href: '/form',
    current: path == '/form' ? true : false,
  },
  {
    name: 'List Transaksi',
    href: '/transaction',
    current: path == '/transaction' ? true : false,
  },
  // { name: path, href: '#', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const navigate = useNavigate();
  const handleClick = async () => {
    // const [token, setToken] = useState('');
    // localStorage.setItem('token', '');
    localStorage.removeItem('token');
    <Navigate to="/" />;
    navigate('/');
    redirect('/');
  };
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src={Logo} alt="Your Company" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link to={item.href} key={item.name}>
                        <button
                          type="button"
                          className={classNames(
                            // item.current
                            // ? 'bg-gray-900 text-white':
                            'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium',
                          )}
                        >
                          {item.name}
                        </button>
                      </Link>
                      // <a
                      //   key={item.name}
                      //   href={item.href}
                      //   className={classNames(
                      //     item.current
                      //       ? 'bg-gray-900 text-white'
                      //       : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      //     'rounded-md px-3 py-2 text-sm font-medium',
                      //   )}
                      //   aria-current={item.current ? 'page' : undefined}
                      // >
                      //   {item.name}
                      //   {item.href}
                      // </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link onClick={handleClick} to={''}>
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Logout</span>
                    <ArrowLeftEndOnRectangleIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={handleClick}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
