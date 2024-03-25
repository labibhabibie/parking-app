// import React, { useState, useEffect } from 'react';
// import { ipcRenderer } from 'electron';
// import ThermalPrinter, { Printer } from 'node-thermal-printer';

// const PrinterConfig: React.FC = () => {
//   const [printerList, setPrinterList] = useState<Printer[]>([]);
//   const [selectedPrinter, setSelectedPrinter] = useState<string>('');

//   useEffect(() => {
//     ThermalPrinter.getDefaultPrinter((err, printers) => {
//       if (err) {
//         console.error('Error mendapatkan daftar printer:', err);
//         return;
//       }

//       setPrinterList(printers);
//     });
//   }, []);

//   const handlePrinterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedPrinter(e.target.value);
//   };

//   return (
//     <div>
//       <h2>Konfigurasi Printer</h2>
//       <div>
//         <label htmlFor="printerSelect">Pilih Printer:</label>
//         <select
//           id="printerSelect"
//           value={selectedPrinter}
//           onChange={handlePrinterChange}
//         >
//           <option value="">Pilih Printer</option>
//           {printerList.map((printer) => (
//             <option key={printer.name} value={printer.name}>
//               {printer.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button
//         onClick={() => ipcRenderer.send('save-printer-config', selectedPrinter)}
//       >
//         Simpan
//       </button>
//     </div>
//   );
// };

// export default PrinterConfig;
