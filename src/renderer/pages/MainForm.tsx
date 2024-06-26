import Datepicker from 'tailwind-datepicker-react';
import RegistrationList from '../components/RegistratoinList';
import Navigation from '../components/Navigation';
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
  BookmarkIcon,
} from '@heroicons/react/20/solid';
import { format } from 'date-fns';

//New
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MainForm = () => {
  //CARD READER
  const [output, setOutput] = useState('');
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState('');

  const onDataReceived = (data: any) => {
    setOutput((prev) => `${prev}\n${data}`);
    setFormData((prevData) => ({
      ...prevData,
      uidKartu: data,
    }));
    console.log('ini data response: ' + data);
  };

  useEffect(() => {
    window.electron.onData(onDataReceived);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.electron.removeDataListener(onDataReceived);
    };
  }, []);

  const handleScanUID = async (e: any) => {
    const port = 'COM5';
    const baudRate = 38400;
    const config = { port, baudRate };
    const responsePort = await window.electron.openPort(config);
    const responseCommand = window.electron.sendCommand(e);
    // const response = await window.electron.getUID();
    // if (response) {
    //   console.log('ini response getUID: ' + response);
    // }
  };

  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    organisasi: '',
    tanggalDaftar: '',
    tanggalKedaluarsa: '',
    jenisKendaraan: 'Sepeda Motor',
    uidKartu: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah data sudah ada di localStorage saat komponen dimuat
    const existingData = JSON.parse(localStorage.getItem('customerData')!);
    if (existingData && existingData.length > 0) {
      const lastId = parseInt(existingData[existingData.length - 1].id);
      setFormData((prevData) => ({
        ...prevData,
        id: String(lastId + 1), // Increment ID dari ID terakhir
      }));
    } else {
      // Jika belum ada data, ID diatur menjadi 1
      setFormData((prevData) => ({
        ...prevData,
        id: '1',
      }));
    }
  }, []); // Efek hanya dijalankan sekali saat komponen dimuat

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    // Simpan data ke localStorage
    const existingData = JSON.parse(localStorage.getItem('customerData')) || [];

    localStorage.setItem(
      'customerData',
      JSON.stringify([...existingData, formData]),
    );

    // Redirect ke halaman CustomerList
    // navigate('/customer-list');
    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-col justify-center px-14 py-6">
        <div className="flex flex-wrap items-center justify-between mb-5 mx-3">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Form Registrasi
            </h2>
          </div>
          <div className="items-center">
            <span className="block">
              <Link to={'/customer-list'}>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
                >
                  <BookmarkIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Daftar Pelanggan
                </button>
              </Link>
            </span>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="w-full">
          <div className="flex flex-col space-y-3 mx-3">
            <div className="px-3">
              <label
                htmlFor="id"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              >
                ID
              </label>
              <input
                id="id"
                name="id"
                type="text"
                required
                placeholder="ID"
                value={formData.id}
                onChange={handleInputChange}
                readOnly // ID tidak dapat diubah oleh pengguna
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded px-4 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="px-3">
              <label
                htmlFor="id"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              >
                Nama
              </label>
              <input
                id="nama"
                name="nama"
                type="text"
                required
                placeholder="NAMA"
                value={formData.nama}
                onChange={handleInputChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded px-4 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="px-3">
              <label
                htmlFor="id"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              >
                Organisasi/Instansi
              </label>
              <input
                id="organisasi"
                name="organisasi"
                type="text"
                required
                placeholder="Organisasi/Instansi"
                value={formData.organisasi}
                onChange={handleInputChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded px-4 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="px-3 flex items-center justify-between ">
              <div className="w-5/12">
                <label
                  htmlFor="id"
                  className="block uppercase tracking-wide  text-gray-700 text-xs font-bold mb-1"
                >
                  Tanggal Daftar
                </label>
                <input
                  id="tanggalDaftar"
                  name="tanggalDaftar"
                  type="date"
                  required
                  placeholder="Jane"
                  value={formData.tanggalDaftar}
                  onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded px-4 leading-tight focus:outline-none focus:bg-white"
                />
              </div>
              <div className="w-5/12">
                <label
                  htmlFor="id"
                  className="block uppercase tracking-wide  text-gray-700 text-xs font-bold mb-1"
                >
                  Tanggal Kedaluarsa
                </label>
                <input
                  id="tanggalKedaluarsa"
                  name="tanggalKedaluarsa"
                  type="date"
                  required
                  placeholder="Jane"
                  value={formData.tanggalKedaluarsa}
                  onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded px-4 leading-tight focus:outline-none focus:bg-white"
                />
              </div>
            </div>
            <div className="px-3">
              <label
                htmlFor="id"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              >
                Jenis Kendaraan
              </label>
              <div className="relative">
                <select
                  id="jenisKendaraan"
                  name="jenisKendaraan"
                  required
                  // placeholder="Jane"
                  value={formData.jenisKendaraan}
                  onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded px-4 leading-tight focus:outline-none focus:bg-white"
                >
                  <option value="Sepeda Motor">Sepeda Motor</option>
                  <option value="Mobil">Mobil</option>
                </select>
              </div>
            </div>
            <div className="px-3">
              <label
                htmlFor="id"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              >
                UID Kartu
              </label>
              <div className="flex flex-row space-x-4">
                <input
                  id="uidKartu"
                  name="uidKartu"
                  type="text"
                  required
                  placeholder="9471094567290457"
                  value={formData.uidKartu}
                  onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded px-4 leading-tight focus:outline-none focus:bg-white"
                />
                <button
                  className="text-gray-800 text-sm text-nowrap"
                  onClick={() =>
                    handleScanUID([
                      0x10, 0x02, 0x08, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00,
                      0x00, 0x01, 0x75, 0x7d, 0x10, 0x03,
                    ])
                  }
                >
                  Scan Card
                </button>
              </div>
            </div>
            {/* Tambahkan input lainnya sesuai kebutuhan */}
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6 mx-3">
            <div className="px-3">
              <button
                type="button"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MainForm;
