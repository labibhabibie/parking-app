const detailWindow = () => {
  return (
    <div>
      <h2>Daftar Pelanggan</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Organisasi/Instansi</th>
            <th>Tanggal Daftar</th>
            <th>Jenis Kendaraan</th>
            <th>UID Kartu</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <div className="overflow-y-auto max-h-80">
          <tbody>
            {customerData.map((customer, index) => (
              <tr key={index}>
                <td>{customer.id}</td>
                <td>{customer.nama}</td>
                <td>{customer.organisasi}</td>
                <td>{customer.tanggalDaftar}</td>
                <td>{customer.jenisKendaraan}</td>
                <td>{customer.uidKartu}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      </table>
    </div>
  );
};

export default detailWindow;
