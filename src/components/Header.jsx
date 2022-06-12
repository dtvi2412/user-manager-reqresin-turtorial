import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-blue-700 text-white flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <Link to="/">
          <span>Api.Reqres</span>
        </Link>

        <Link to="/dashboard">
          <span>Dashboard</span>
        </Link>
      </div>

      <div>
        {user.email ? (
          <div className="font-bold flex items-center gap-2">
            <h3> {user.email}</h3>
            <span
              onClick={logout}
              className="bg-red-600 hover:bg-red-800 cursor-pointer text-white rounded-md p-2"
            >
              Logout
            </span>
          </div>
        ) : (
          <Link to="/login" className="bg-black text-white p-2 rounded-md">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
