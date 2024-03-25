import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { BookmarkIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { time } from 'console';
import { format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';

const sendRequest = async (params: any) => {
  try {
    const response = await axios.post(
      'http://sandbox.mkpmobile.com:18080/parking/local/report-trx/trx-list',
      {
        keyword: params.keyword || '',
        typeCard: '',
        dateFrom: params.dateFrom || null,
        dateTo: params.dateTo || format(new Date(), 'yyyy-MM-dd'),
        limit: 50,
        offset: 0,
        draw: 1,
        ascDesc: 'DESC',
        columnOrderName: '',
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
interface Transaction {
  docNo: string;
  vehicleNumberIn: string;
  checkInDatetime: string;
  trxInvoiceItem: { productName: string };
}
const TransactionList = () => {
  const [apiResponse, setApiResponse] = useState<Transaction[] | null>(null);
  const [keyword, setKeyword] = useState(null);
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  // const request = { keyword: null, dateFrom: '', dataTo: currentDate };

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequest('');
      if (response && response.result && response.result.data) {
        setApiResponse(response.result.data);
      } else {
        console.error('Invalid API response format');
      }
    };
    fetchData();
  }, []);

  // const handleClick = async (docNo) => {
  //   const history = useHistory;

  // try {
  //   const response = await sendRequest({ keyword: docNo });
  //   if (response && response.result && response.result.data) {
  //     // Membuka halaman baru dengan detail data respons
  //     const detailWindow = window.open('', '_blank');
  //     detailWindow.document.write(`
  //       <html>
  //         <head>
  //           <title>Detail Transaksi</title>
  //         </head>
  //         <body>
  //           <h1>Detail Transaksi</h1>
  //           <pre>${JSON.stringify(response.result.data, null, 2)}</pre>
  //         </body>
  //       </html>
  //     `);
  //   } else {
  //     console.error('Invalid API response format');
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
  // };
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
            {/* <button
              type="button"
              // onClick={handleClick}
              className="inline-flex items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
            >
              <BookmarkIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {currentDate}
              Refresh
            </button> */}
          </span>
        </div>
      </div>

      <div className=" overflow-x-auto divide-y">
        <Table>
          <TableHead>
            <TableHeadCell className="w-1/12">No</TableHeadCell>
            <TableHeadCell className="w-3/12">No Document</TableHeadCell>
            <TableHeadCell className="w-3/12">No Kendaraan</TableHeadCell>
            <TableHeadCell className="w-3/12">Waktu Check In</TableHeadCell>
            <TableHeadCell className="w-2/12">Action</TableHeadCell>
          </TableHead>
        </Table>
        <div
          className=" bg-white"
          style={{ maxHeight: '55vh', overflowY: 'scroll' }}
        >
          <Table>
            <TableBody>
              {(apiResponse ?? []).map((transaction, index) => (
                <TableRow key={transaction.docNo}>
                  <TableCell className="w-1/12">{index + 1}</TableCell>
                  <TableCell className="w-3/12">{transaction.docNo}</TableCell>
                  <TableCell className="w-3/12">
                    {transaction.trxInvoiceItem.productName}
                  </TableCell>
                  <TableCell className="w-3/12">
                    {transaction.checkInDatetime}
                  </TableCell>
                  {/* Render data lainnya sesuai kebutuhan */}
                  <TableCell className="w-2/12">
                    <Link
                      to={'/detail/' + transaction.docNo}
                      state={{ transaction }}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Details
                    </Link>
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

export default TransactionList;
