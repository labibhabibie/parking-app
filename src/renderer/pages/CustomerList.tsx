import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';

interface Customer {
  id: string;
  nama: string;
  organisasi: string;
  tanggalDaftar: string;
  tanggalKedaluarsa: string;
  jenisKendaraan: string;
  uidKartu: string;
}

const CustomerList = () => {
  const [customerData, setCustomerData] = useState<Customer[] | null>([]);

  useEffect(() => {
    // Ambil data pelanggan dari localStorage saat komponen dimuat
    const existingData = localStorage.getItem('customerData');
    if (existingData) {
      setCustomerData(JSON.parse(existingData));
    }
  }, []); // Efek hanya dijalankan sekali saat komponen dimuat

  const handleDelete = (index: any) => {
    // Hapus data pelanggan berdasarkan indeks
    const updatedData = [...customerData];
    updatedData.splice(index, 1);
    localStorage.setItem('customerData', JSON.stringify(updatedData));
    setCustomerData(updatedData);
  };

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex flex-col justify-center px-14 py-6">
      <div className="flex flex-wrap items-center justify-between mb-5 mx-3">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            List Transaksi
          </h2>
        </div>
        <div className="items-center">
          <span className="block">
            <button
              type="button"
              onClick={() => handleReset}
              // onClick={handleClick}
              className="inline-flex items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
            >
              {/* <BookmarkIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              /> */}
              {/* {currentDate} */}
              Refresh
            </button>
          </span>
        </div>
      </div>

      <div className=" overflow-x-auto divide-y">
        <Table>
          <TableHead>
            <TableHeadCell className="w-1/12">No</TableHeadCell>
            <TableHeadCell className="w-2/12">Customer Id</TableHeadCell>
            <TableHeadCell className="w-2/12">Nama</TableHeadCell>
            <TableHeadCell className="w-2/12">
              Organisasi/instansi
            </TableHeadCell>
            <TableHeadCell className="w-1/12">Tanggal Daftar</TableHeadCell>
            <TableHeadCell className="w-2/12">Tanggal Kedaluarsa</TableHeadCell>
            <TableHeadCell className="w-2/12">Jenis Kendaraan</TableHeadCell>
            <TableHeadCell className="w-2/12">Acton</TableHeadCell>
          </TableHead>
        </Table>
        <div
          className=" bg-white"
          style={{ maxHeight: '55vh', overflowY: 'scroll' }}
        >
          <Table>
            <TableBody>
              {(customerData ?? []).map((customer, index) => (
                <TableRow key={customer.id}>
                  <TableCell className="w-1/12">{index + 1}</TableCell>
                  <TableCell className="w-2/12">{customer.id}</TableCell>
                  <TableCell className="w-2/12">{customer.nama}</TableCell>
                  <TableCell className="w-2/12">
                    {customer.organisasi}
                  </TableCell>
                  <TableCell className="w-1/12">
                    {customer.tanggalDaftar}
                  </TableCell>
                  <TableCell className="w-2/12">
                    {customer.tanggalKedaluarsa}
                  </TableCell>
                  <TableCell className="w-2/12">
                    {customer.jenisKendaraan}
                  </TableCell>
                  <TableCell className="w-2/12">{customer.uidKartu}</TableCell>
                  <TableCell className="w-2/12 ">
                    <button
                      className="font-medium hover:underline dark:text-cyan-500 "
                      onClick={() => handleDelete(index)}
                    >
                      Hapus
                    </button>
                    {/* <Link
                      to={'/detail/' + transaction.docNo}
                      state={{ transaction }}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Action
                    </Link> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
