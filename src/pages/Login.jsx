import { Link } from 'react-router-dom';
function Login() {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)]">
      <div className="bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-4">
        <form className="flex flex-col gap-2">
          <h1 className="text-[2.5rem]">Login </h1>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="border border-gray-500 pl-2"
              placeholder="Email..."
              id="email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="border border-gray-500 pl-2"
              placeholder="Password..."
              id="password"
            />
          </div>
          <div>
            <button className="bg-blue-500 text-white w-full py-1">
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
