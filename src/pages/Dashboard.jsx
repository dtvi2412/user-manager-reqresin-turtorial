import { useContext, useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from '../contexts/AuthContext';
import httpRequest from './../utils/request';
import { Link } from 'react-router-dom';
import Dialog from '../components/Dialog';
import useDialog from '../hooks/useDialog';

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  const userIdRef = useRef(null);

  const { dialog, closeDialog, handleChangeDialog } = useDialog();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await httpRequest.get(`users?page=${page}`);

        setUsers([...res.data.data]);
        setPagination(res.data.total_pages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [page]);

  if (!user.email) {
    return (
      <div className="bg-red-600 text-white py-4 text-center">Need Login!</div>
    );
  }

  const renderUsersTable = () => {
    return (
      <div className="w-full overflow-x-scroll md:overflow-hidden">
        <table className="w-full border border-[#ccc] p-4 border-separate text-left">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First_name</th>
              <th>Last_name</th>
              <th>Avatar</th>
              <th>View Detail</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <img
                    className="w-[60px] h-[60px] object-cover"
                    src={user.avatar}
                    alt={user.first_name}
                  />
                </td>
                <td>
                  <Link to={`/users/${user.id}`}>
                    <span className="px-2 py-1 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-700">
                      View detail
                    </span>
                  </Link>
                </td>
                <td>
                  <span
                    onClick={() => {
                      handleChangeDialog(
                        true,
                        `Are you sure you want to delete ${user.first_name}?`
                      );

                      userIdRef.current = user.id;
                    }}
                    className="px-2 py-1 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700"
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderPagination = () => {
    return Array(pagination)
      .fill()
      .map((_, index) => {
        return (
          <button
            onClick={() => setPage(index + 1)}
            className={`px-2 py-1 border ${
              index + 1 === page && 'bg-blue-700 text-white'
            }  mr-1`}
            key={index}
          >
            {index + 1}
          </button>
        );
      });
  };

  const handleDelete = async () => {
    try {
      const res = await httpRequest.delete(`users/${userIdRef.current}`);
      const STATUS_SUCCESS = 204;
      if (res.status === STATUS_SUCCESS) {
        setUsers((prev) => prev.filter((u) => u.id !== userIdRef.current));
        closeDialog();

        toast.success('Delete Successfully!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderDialog = () => {
    if (dialog.isOpen) {
      return (
        <Dialog
          message={dialog.message}
          onClose={closeDialog}
          onSubmit={() => handleDelete()}
        />
      );
    }
  };

  return (
    <div>
      <div className="w-[80%] mx-auto mt-10">
        {renderUsersTable()}
        <div className="mt-2">{renderPagination()}</div>
        {renderDialog()}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Dashboard;
