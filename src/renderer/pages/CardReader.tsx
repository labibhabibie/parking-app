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

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CardReader = () => {
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState('');
  const [selectedBaud, setSelectedBaud] = useState(38400);
  const [response, setResponse] = useState('');
  const [output, setOutput] = useState('');
  const [connected, setConnected] = useState(false);
  const textareaRef = useRef(null);

  const onDataReceived = (data: any) => {
    setOutput((prev) => `${prev}\n${data}`);
  };

  useEffect(() => {
    window.electron.onData(onDataReceived);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.electron.removeDataListener(onDataReceived);
    };
  }, []);

  useEffect(() => {
    console.log('Start Card Reader Page');
    const fetchPorts = async () => {
      try {
        const availablePorts = await window.electron.getPorts();
        setPorts(availablePorts);
        if (availablePorts.length > 0) {
          setSelectedPort(availablePorts[0].path);
        }
      } catch (error) {
        console.error('Failed to fetch ports:', error);
      }
    };

    fetchPorts();
    window.electron.ipcRenderer.receive('command-status', (_, status) => {
      console.log(status);
    });
  }, []);

  useEffect(() => {
    // This function will run every time 'output' changes
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.scrollTop = textarea.scrollHeight; // Scroll to the bottom
    }
  }, [output]);

  const handleOpenPort = async (e) => {
    console.log('Open Connection');
    const config = { selectedPort, selectedBaud };
    const response = await window.electron.openPort(config);
    if (response) {
      console.log('ini response open port: ' + response);
      setConnected(true);
      setOutput((prev) => `${prev}\n${response}`);
    }
  };

  const handleClosePort = async () => {
    console.log('Connection STOP');
    const response = await window.electron.closePort(selectedPort);
    if (response) {
      console.log(response);
      setConnected(false);
      setOutput((prev) => `${prev}\n${response}`);
    }
  };

  const handleSendCommand = (command: [[number]]) => {
    if (!connected) {
      alert('Please connect to the port first');
      return;
    }
    const response = window.electron.sendCommand(command);
    console.log('ini response send command: ' + response);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col justify-center px-14 py-6">
        <div className="flex flex-wrap items-center justify-between mb-5 mx-3">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              CARD READER
            </h2>
          </div>
          {/* <div className="items-center">
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
          </div> */}
        </div>

        <div className="flex flex-row mx-3 w-full mb-5">
          <div className="w-6/12">
            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-1">
              Configuration
            </label>
            <div className="flex flex-row space-x-6">
              <div className="">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                  Conection status:
                  {connected ? (
                    <span> Connected</span>
                  ) : (
                    <span> Disconnected</span>
                  )}
                </label>
                <div className=" flex flex-row space-x-3 ">
                  <select
                    className="font-bold w-5/12 appearance-none block bg-gray-200 text-gray-700 border rounded leading-tight focus:outline-none focus:bg-white"
                    name="port"
                    id="port"
                    onChange={(e) => setSelectedPort(e.target.value)}
                    value={selectedPort}
                  >
                    {ports.map((port, idx) => (
                      <option key={idx} value={port.path}>
                        {port.path}
                      </option>
                    ))}
                  </select>
                  <button
                    className={`rounded-md me-5 px-2  ${
                      connected
                        ? 'bg-green-500 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50'
                        : 'inline-flex items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={handleOpenPort}
                  >
                    CONNECT
                  </button>
                  <button
                    className="inline-flex items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
                    onClick={handleClosePort}
                  >
                    STOP
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                  Speed Rate (temp)
                </label>
                <div className=" flex flex-row space-x-3 ">
                  <select
                    className="font-bold appearance-none block bg-gray-200 text-gray-700 border rounded leading-tight focus:outline-none focus:bg-white"
                    name="baudRate"
                    id="baudRate"
                    onChange={(e) =>
                      setSelectedBaud(parseInt(e.target.value, 10))
                    }
                    value={selectedBaud}
                  >
                    <option value="9600">9600</option>
                    <option value="19200">19200</option>
                    <option value="38400">38400</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="w-6/12">
            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-1">
              FUNCTION
            </label>
            <div className="flex flex-row ">
              <div className="pe-3 flex flex-col me-5">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                  Check Card UID
                </label>
                <div className=" flex flex-row space-x-3">
                  <button
                    className="w-6/6 items-center rounded-md bg-gray-200 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
                    onClick={() =>
                      handleSendCommand([
                        0x10, 0x02, 0x08, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00,
                        0x00, 0x01, 0x75, 0x7d, 0x10, 0x03,
                      ])
                    }
                  >
                    GET UID
                  </button>
                </div>
              </div>
              <div className="pe-3 flex flex-col me-5">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                  Check Card Balance
                </label>
                <div className=" flex flex-row space-x-3 w-full">
                  <button
                    className="w-6/6 items-center rounded-md bg-gray-200 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
                    onClick={() =>
                      handleSendCommand([
                        0x10, 0x02, 0x08, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00,
                        0x00, 0x01, 0x42, 0x4a, 0x10, 0x03,
                      ])
                    }
                  >
                    GET BALANCE
                  </button>
                </div>
              </div>
              <div className="pe-3 flex flex-col me-5">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                  Stop Reading Card
                </label>
                <div className=" flex flex-row space-x-3 w-full">
                  <button
                    className="w-6/6 items-center rounded-md bg-gray-200 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
                    onClick={() =>
                      handleSendCommand([
                        0x10, 0x02, 0x08, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00,
                        0x00, 0x01, 0x47, 0x4f, 0x10, 0x03,
                      ])
                    }
                  >
                    STOP READNING
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mx-3 mb-5">
          <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-1">
            LOG
          </label>
          <div className="flex flex-row">
            <div className="pe-3 flex flex-col me-5 w-full">
              <textarea
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                id="textareaLogging"
                value={output}
                readOnly
                ref={textareaRef} // Attach the ref to the textarea element
                style={{ width: '100%', height: '300px' }}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardReader;
