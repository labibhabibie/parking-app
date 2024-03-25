import { log } from 'console';
import logo from '../../../assets/logo.svg';
import Login from '../components/Login';
// import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-6 py-5 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm py-5">
          <img className="mx-auto h-40 w-auto" src={logo} alt="Parking APP" />
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight ">
            Parking APP
          </h2>
        </div>
        <Login />
        {/* <Link to={'/dashboard'}>
          <button className="bg-black">Next</button>
        </Link> */}
      </div>
    </>
  );
};
console.error('ada ga?', localStorage.getItem('token'));

export default Home;
