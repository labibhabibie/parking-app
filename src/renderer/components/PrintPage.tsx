// import React, { useEffect } from 'react';
// import {
//   ThermalPrinter,
//   BreakLine,
//   PrinterTypes,
//   CharacterSet,
// } from 'node-thermal-printer';

// const PrintPage: React.FC = () => {
//   useEffect(() => {
//     const printData = async () => {
//       try {
//         const printer = new ThermalPrinter({
//           type: PrinterTypes.EPSON,
//           interface: 'tcp://192.168.0.100', // Ganti dengan alamat IP printer Anda
//           characterSet: CharacterSet.PC852_LATIN2, // Printer character set
//           removeSpecialCharacters: false, // Removes special characters - default: false
//           lineCharacter: '=', // Set character for lines - default: "-"
//           breakLine: BreakLine.WORD, // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
//           options: {
//             // Additional options
//             timeout: 5000,
//           },
//         });

//         // Lakukan pencetakan di sini
//         // Contoh: mencetak teks
//         printer.println('Contoh Pencetakan');
//         printer.println('==================');

//         // Contoh: mencetak data dari TransactionDetail
//         // Anda dapat mengakses data yang diperlukan dari props atau state

//         await printer.execute();
//         console.log('Pencetakan selesai');
//       } catch (err) {
//         console.error('Error saat mencetak:', err);
//       }
//     };

// //     printData();
// //   }, []);

//   return (
//     <div>
//       <h2>Halaman Siap Print</h2>
//       <p>Printer sedang mencetak...</p>
//     </div>
//   );
// };

// export default PrintPage;
