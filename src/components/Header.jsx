import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-700 text-white flex items-center justify-between p-4">
      <div>Api.Reqres</div>
      <div>Dashboard</div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </header>
  );
}

export default Header;
