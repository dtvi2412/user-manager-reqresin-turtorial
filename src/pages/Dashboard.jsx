import { useContext, useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { AuthContext } from '../contexts/AuthContext';
import httpRequest from './../utils/request';
import { Link } from 'react-router-dom';
import Dialog from '../components/Dialog';
import useDialog from '../hooks/useDialog';
import PopupAdd from '../components/PopupAdd';
import PopupEdit from '../components/PopupEdit';
import useDebounce from '../hooks/useDebounce';
import NeedLogin from '../components/NeedLogin';

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [fullUsers, setFullUsers] = useState([]);

  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const userIdRef = useRef(null);

  const { dialog, closeDialog, handleChangeDialog } = useDialog();

  const [popupAdd, setPopupAdd] = useState({
    isOpen: false,
    name: '',
    job: '',
  });

  const [popupEdit, setPopupEdit] = useState({
    isOpen: false,
    name: '',
    job: '',
  });

  const { valueDebounce, loading } = useDebounce(search, 500); //0.5s

  useEffect(() => {
    if (!valueDebounce) {
      setUsers(fullUsers);
      return;
    }

    const search = (data, key) => {
      return data.filter((item) =>
        item[key].toLowerCase().includes(valueDebounce.toLowerCase())
      );
    };

    //Search email
    setUsers((prev) => search(prev, 'email'));
  }, [valueDebounce, fullUsers]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await httpRequest.get(`users?page=${page}`);

        setUsers([...res.data.data]);
        setFullUsers([...res.data.data]);
        setPagination(res.data.total_pages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [page]);

  if (!user.email) {
    return <NeedLogin />;
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
              <th>Edit</th>
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
                      setPopupEdit({
                        isOpen: true,
                        name: user.first_name,
                        job: 'it',
                      });
                      userIdRef.current = user.id;
                    }}
                    className="px-2 py-1 bg-lime-500 text-white rounded-md cursor-pointer hover:bg-lime-700"
                  >
                    Edit
                  </span>
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

  const renderPopupAdd = () => {
    if (popupAdd.isOpen) {
      return (
        <PopupAdd onSubmit={handleAddUser} onClose={handleClosePopupAdd} />
      );
    }
  };

  const handleClosePopupEdit = () => {
    setPopupEdit({
      isOpen: false,
      name: '',
      job: '',
    });
  };

  const handleUpdateUser = async (e, user) => {
    e.preventDefault();

    try {
      const res = await httpRequest.put(`users/${userIdRef.current}`, user);

      const STATUS_UPDATE_SUCCESS = 200;
      if (res.status === STATUS_UPDATE_SUCCESS) {
        setUsers((prev) => {
          return prev.map((u) => {
            if (u.id === userIdRef.current) {
              return { ...u, first_name: res.data.name };
            }
            return { ...u };
          });
        });

        toast.success('Update user successfully!');

        handleClosePopupEdit();
      }
      console.log('res', res);
    } catch (err) {
      console.log(err);
    }
  };

  const renderPopupEdit = () => {
    if (popupEdit.isOpen) {
      return (
        <PopupEdit
          userProp={{ name: popupEdit.name, job: popupEdit.job }}
          onSubmit={handleUpdateUser}
          onClose={handleClosePopupEdit}
        />
      );
    }
  };

  const handleAddUser = async (e, obj) => {
    e.preventDefault();
    if (!obj.name || !obj.job) {
      alert('Need to fill in all the information!');
      return;
    }

    let newUser = {};

    try {
      const res = await httpRequest.post('users', obj);

      newUser = {
        id: res.data.id,
        first_name: 'Need update!',
        last_name: 'Need update!',
        email: `${res.data.name}@reqres.in`,
        avatar:
          'data:image/jpeg;base64,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',
      };

      const STATUS_CREATE_SUCCESS = 201;
      if (res.status === STATUS_CREATE_SUCCESS) {
        setUsers((prev) => [...prev, newUser]);
        toast.success('Add user successfully!');
      }

      handleClosePopupAdd();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClosePopupAdd = () => {
    setPopupAdd({
      isOpen: false,
      name: '',
      job: '',
    });
  };

  const handleSort = (value) => {
    const name = value.split(' ')[0];
    const type = value.split(' ')[1];

    const sortUsers = [...users];

    sortUsers.sort((a, b) => {
      if (name === 'id') {
        return type === 'asc' ? a.id - b.id : b.id - a.id;
      }

      return type === 'asc'
        ? ('' + a[name]).localeCompare(b[name])
        : ('' + b[name]).localeCompare(a[name]);
    });

    setUsers(sortUsers);
  };
  return (
    <div>
      <div className="w-[80%] mx-auto mt-10">
        <button
          onClick={() => setPopupAdd({ isOpen: true, name: '', job: '' })}
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold my-2 px-2 py-1 rounded-sm"
        >
          Add user
        </button>
        <select
          defaultValue=""
          onChange={(e) => handleSort(e.target.value)}
          className="px-2 py-1 rounded-md ml-2 bg-violet-500 text-white"
        >
          <option value="" disabled>
            Sort by options
          </option>
          <option value="email asc">Email (A-Z)</option>
          <option value="email desc">Email (Z-A)</option>
          <option value="id asc">ID (A-Z)</option>
          <option value="id desc">ID (Z-A)</option>
        </select>

        <div className="relative w-[200px] h-[40px] flex items-center justify-center ">
          <div>
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="border border-gray-500 px-2 py-1 rounded-sm"
            />
            {loading && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2">
                <AiOutlineLoading3Quarters className="animate-spin text-lime-600" />
              </span>
            )}
          </div>
        </div>

        {renderUsersTable()}
        {renderPopupAdd()}
        {renderPopupEdit()}
        <div className="mt-2">{renderPagination()}</div>
        {renderDialog()}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Dashboard;
