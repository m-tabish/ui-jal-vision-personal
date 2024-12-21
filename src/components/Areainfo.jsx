
const AreaInfo = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-black-400">
        <tbody>
          <tr>
            <th className=" font-bold border border-gray-900 text-left align-top py-2 min-w-1/3">Pincode</th>
            <th className=" font-bold border border-gray-900 text-left align-top px-4 py-2 min-w-1/3">City</th>
            <th className=" font-bold border border-gray-900 text-left align-top px-4 py-2 min-w-1/3">State</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AreaInfo;
