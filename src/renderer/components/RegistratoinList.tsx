const RegistrationList = () => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full border text-center text-sm font-light dark:border-gray-700">
              <thead className="border-b font-medium dark:border-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 dark:border-gray-700"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 dark:border-gray-700"
                  >
                    First
                  </th>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 dark:border-gray-700"
                  >
                    Last
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Handle
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-gray-700">
                    1
                  </td>
                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-gray-700">
                    Mark
                  </td>
                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-gray-700">
                    Otto
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-gray-700">
                    2
                  </td>
                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-gray-700">
                    Jacob
                  </td>
                  <td className="whitespace-nowrap border-r px-6 py-4 dark:border-gray-700">
                    Thornton
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">@fat</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-gray-700">
                    3
                  </td>
                  <td
                    colSpan={2}
                    className="whitespace-nowrap border-r px-6 py-4 dark:border-gray-700"
                  >
                    Larry the Bird
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationList;
