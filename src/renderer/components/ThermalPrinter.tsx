const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;

// Membuat instance printer
const printer = new ThermalPrinter({
  type: PrinterTypes.EPSON, // Tipe printer Epson
  interface: 'tcp://192.168.0.100', // Ganti dengan alamat IP printer Anda
  options: {
    maxPrintingDots: 7, // Jumlah dot maksimum untuk pencetakan
    maxPrintingArea: 576, // Lebar area cetak maksimum dalam dot
    heatingTime: 120, // Waktu pemanasan (peningkatan kualitas cetak)
    heatingInterval: 2, // Interval pemanasan
    commandSet: 'epson', // Set perintah printer
    exceptions: {
      removeEnd: true, // Menghapus karakter akhir dari buffer
      removeUnderline: true, // Menghapus karakter garis bawah dari buffer
    },
  },
});

// Mencetak teks
printer.println('Contoh Cetak Teks');
printer.println('==================');
printer.bold(true);
printer.println('Teks Tebal');
printer.bold(false);
printer.underline(true);
printer.println('Teks Garis Bawah');
printer.underline(false);

// Mencetak barcode
printer.printBarcode('1234567890');

// Memotong kertas
printer.cut();

// Menutup koneksi printer
printer.execute(function (err) {
  if (err) {
    console.error('Error saat mencetak:', err);
  } else {
    console.log('Pencetakan selesai');
  }
});
