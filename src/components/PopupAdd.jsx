import { useState } from 'react';
import BackgroundBlack from '../layouts/BackgroundBlack';

function PopupAdd({ onSubmit, onClose }) {
  const [user, setUser] = useState({
    name: '',
    job: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setUser((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  console.log(user);
  return (
    <BackgroundBlack>
      <form className="bg-white p-4 rounded-md flex flex-col gap-2">
        <h1 className="text-[40px] font-bold">Add user</h1>
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            className="border border-gray-400 px-2"
            placeholder="Name..."
            id="name"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="job">Job</label>
          <input
            onChange={handleChange}
            className="border border-gray-400 px-2"
            placeholder="Job..."
            id="job"
          />
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => onSubmit(e, user)}
            className="bg-blue-600 text-white px-2 py-1 rounded-sm"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-2 py-1 rounded-sm"
          >
            Close
          </button>
        </div>
      </form>
    </BackgroundBlack>
  );
}

export default PopupAdd;
