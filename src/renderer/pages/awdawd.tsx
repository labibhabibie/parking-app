const q = () => {
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
                placeholder="Jane"
                value={formData.id}
                onChange={handleInputChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded px-4 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                id="grid-first-name"
              >
                Nama
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                required
                value={formData.nama}
                onChange={handleInputChange}
                placeholder="Jane"
              />
            </div>
            <div className="px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                id="grid-first-name"
              >
                Organisasi/Instansi
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                required
                value={formData.organisasi}
                onChange={handleInputChange}
                placeholder="Jane"
              />
            </div>
            <div className="px-3 flex items-center justify-between ">
              <div className="w-5/12">
                <label
                  className="block uppercase tracking-wide  text-gray-700 text-xs font-bold mb-1"
                  id="grid-last-name"
                >
                  Tanggal Daftar
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded px-4 eading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="date"
                  required
                  value={formData.tanggalDaftar}
                  onChange={handleInputChange}
                  placeholder="Doe"
                />
              </div>
              <div className="w-5/12">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                  id="grid-last-name"
                >
                  Tanggal Kedaluarsa
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="date"
                  required
                  value={formData.tanggalKedaluarsa}
                  onChange={handleInputChange}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                id="grid-state"
              >
                Jenis Kendaraan
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.jenisKendaraan}
                  onChange={handleInputChange}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option value="Sepeda Motor">Sepeda Motor</option>
                  <option value="Mobil">Mobil</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
              </div>
            </div>
            <div className="px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                id="grid-zip"
              >
                UID Kartu
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                required
                placeholder="902101672837471"
              />
            </div>
          </div>
          <div className="flex flex-col mb-2"></div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
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
        </form>
        {/* <RegistrationList /> */}
      </div>
    </>
  );
};

export default q;
