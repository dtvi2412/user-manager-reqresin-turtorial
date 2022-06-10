import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Header() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <header className="bg-blue-700 text-white flex items-center justify-between p-4">
      <div>Api.Reqres</div>
      <div>Dashboard</div>
      <div>
        {user.email ? (
          <div className="font-bold text-red-300">{user.email}</div>
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
