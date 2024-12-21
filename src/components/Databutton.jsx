// src/components/databutton/ButtonGroup.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';


const ButtonGroup = () => {
  const navigate = useNavigate();

  const navigateToMapComponentPage = () => {
    navigate('/MapComponent');
  };

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex space-x-4">
        <button className="w-32 bg-white hover:bg-gray-100 text-black font-semibold py-2 px-2 border border-gray-300 rounded shadow">
          All
        </button>
        <button className="w-32 bg-white hover:bg-gray-100 text-black font-semibold py-2 px-2 border border-gray-300 rounded shadow">
          No Data
        </button>
        <button className="w-32 bg-white hover:bg-gray-100 text-black font-semibold py-2 px-2 border border-gray-300 rounded shadow">
          Abnormal Data
        </button>
        <button className="w-32 bg-white hover:bg-gray-100 text-black font-semibold py-2 px-2 border border-gray-300 rounded shadow">
          Low Battery
        </button>
      </div>
      <button
        onClick={navigateToMapComponentPage}
        className="w-32 bg-white hover:bg-gray-100 text-black font-semibold py-2 px-2 border border-gray-300 rounded shadow"
      >
        Map
      </button>
    </div>
  );
};

export default ButtonGroup;
