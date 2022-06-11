import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import httpRequest from '../utils/request';
function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { user: authUser, login } = useContext(AuthContext);

  useEffect(() => {
    if (authUser.email) {
      navigate('/');
    }
  }, [authUser.email, navigate]);

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      alert('Filter all please!');
      return;
    }

    try {
      const res = await httpRequest.post('login', user);

      login({
        email: user.email,
        token: res.data.token,
      });

      navigate('/');
    } catch (err) {
      console.log('login faild', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)]">
      <div className="bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-4">
        <div>"email": "eve.holt@reqres.in", "password": "cityslicka"</div>

        <form className="flex flex-col gap-2">
          <h1 className="text-[2.5rem]">Login </h1>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              className="border border-gray-500 pl-2"
              placeholder="Email..."
              id="email"
              type="email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              className="border border-gray-500 pl-2"
              placeholder="Password..."
              id="password"
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white w-full py-1"
            >
              Login
            </button>
          </div>
          <Link className="text-right text-[0.8rem]" to="/">
            <span>Back home</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
