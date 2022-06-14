import BackgroundBlack from '../layouts/BackgroundBlack';

function Dialog({ message, onSubmit, onClose }) {
  return (
    <BackgroundBlack>
      <div className="bg-white p-4 rounded-md min-w-[250px] flex flex-col items-center gap-3">
        <h1 className="text-[30px] text-center font-bold">{message}</h1>
        <div className="flex items-center gap-1 text-white">
          <button
            className="bg-blue-500 hover:bg-blue-800 cursor-pointer px-2 py-1 rounded-sm"
            onClick={onSubmit}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-800 cursor-pointer px-2 py-1 rounded-sm"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </BackgroundBlack>
  );
}
export default Dialog;
