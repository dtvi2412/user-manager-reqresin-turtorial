import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import httpRequest from './../utils/request';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

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

  return (
    <div>
      <div className="w-[80%] mx-auto mt-10">
        {renderUsersTable()}
        <div className="mt-2">{renderPagination()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
