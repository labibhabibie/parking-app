import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeftIcon, PrinterIcon } from '@heroicons/react/20/solid';

import { format } from 'date-fns';

const TransactionDetail = () => {
  const param = useParams();
  //   const { docNo } = useParams<DetailTransactionProps>();
  const [detailData, setDetailData] = useState<Detail[] | null>(null);
  interface Detail {
    _id: string;
    docNo: string;
    vehicleNumberIn: string;
    checkInDatetime: string;
    productName: string;
    trxInvoiceItem: {
      docNo: string;
      productName: string;
      overnightTime: string;
      qty: number;
      price: number;
      amount: number;
    }[];
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://sandbox.mkpmobile.com:18080/parking/local/report-trx/trx-list',
          {
            keyword: param.docNo,
            typeCard: '',
            dateFrom: null,
            dateTo: format(new Date(), 'yyyy-MM-dd'),
            limit: 1,
            offset: 0,
            draw: 1,
            ascDesc: 'DESC',
            columnOrderName: '',
          },
        );

        if (response && response.data && response.data.result) {
          setDetailData(response.data.result.data);
          console.log('Masuk', param.docNo);
          console.log(detailData);
        } else {
          console.error('Invalid API response format');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [param.docNo]);

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
            <Link to={'/transaction'}>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
              >
                <PrinterIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Print
              </button>
            </Link>
            <Link to={'/transaction'}>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
              >
                <ArrowLeftIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Back
              </button>
            </Link>
          </span>
        </div>
      </div>
      <form className="w-full ">
        {detailData &&
          Array.isArray(detailData) &&
          detailData.map((detail, index) => (
            <div
              key={detail._id}
              className="flex flex-col space-y-3 mx-3 bg-white rounded-lg py-5"
            >
              <div className="px-3 ">
                <h3
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                  id="grid-first-name"
                >
                  Transaction ID&emsp;&emsp;&ensp;: {detail._id}
                </h3>
              </div>
              <div className="px-3 ">
                <h3
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                  id="grid-first-name"
                >
                  Document ID&emsp;&emsp;&emsp;&emsp;: {detail.docNo}
                </h3>
              </div>
              <div className="px-3 ">
                <h3
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                  id="grid-first-name"
                >
                  Waktu Check In &emsp;&emsp;: {detail.checkInDatetime}
                </h3>
              </div>
              {detail.trxInvoiceItem.map((item, itemIndex) => (
                <div key={itemIndex} className="flex flex-col space-y-3">
                  <div className="px-3 ">
                    <h3
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                      id="grid-first-name"
                    >
                      Jenis Kendaraan&ensp;&emsp;: {item.productName}
                    </h3>
                  </div>
                  <div className="px-3 ">
                    <h3
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                      id="grid-first-name"
                    >
                      No Kendaraan&emsp;&emsp;&emsp;: {item.docNo}
                    </h3>
                  </div>
                  <div className="px-3 ">
                    <h3
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                      id="grid-first-name"
                    >
                      Menginap &ensp;&emsp;&emsp;&emsp;&emsp;&emsp;:{' '}
                      {item.overnightTime == '' ? 'Ya' : 'Tidak'}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </form>
    </div>
  );
};

export default TransactionDetail;
