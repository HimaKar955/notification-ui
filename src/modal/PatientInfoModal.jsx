import React from 'react';

interface PatientInfoModalProps {
  isOpen: boolean;
}

const PatientInfoModal: React.FC<PatientInfoModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative">
        {/* Top Right Avatar */}
        <div className="absolute top-4 right-4 flex items-center space-x-[-8px]">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            V
          </div>
        </div>

        {/* Patient Info */}
        <h2 className="text-xl font-bold">Last Name, First Name</h2>
        <p className="text-gray-600 mb-4">DOB: MM/DD/YYYY</p>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search by test name or test code"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <span className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
              🔍
            </span>
          </div>

          <select className="border border-gray-300 rounded-md px-3 py-2">
            <option>Select</option>
          </select>

          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Out of range</span>
          </label>

          <button className="px-4 py-2 bg-gray-200 rounded-md">Reset</button>
        </div>

        {/* Time Range Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['3 Months', '6 Months', '1 Year', '2 Years', '3 Years'].map((label) => (
            <button
              key={label}
              className={`px-3 py-1 rounded-md border ${
                label === '3 Years'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t pt-4">
          <p className="font-medium text-gray-700 flex items-center gap-1">
            🚧 Table under construction
          </p>
          <div>
            <button className="px-3 py-1 bg-gray-300 rounded-md mr-2">List</button>
            <button className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md">
              Chart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoModal;
