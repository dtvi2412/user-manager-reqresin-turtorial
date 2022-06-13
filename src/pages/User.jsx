import { useContext, useEffect, useState } from 'react';
import { AiOutlineRollback } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import httpRequest from '../utils/request';

function User() {
  const { user: authUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!authUser.email) {
      navigate('/');
    }
  }, [authUser.email, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await httpRequest.get(`/users/${id}`);

        setUser(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [id]);

  const renderUser = () => {
    return (
      <div className="border border-[#ccc] p-4 rounded-md">
        <h3>ID: {user.id}</h3>
        <h3>Name: {user.first_name}</h3>
        <p>Email: {user.email}</p>
        <img
          src={user.avatar}
          alt={user.first_name}
          className="w-[100px] h-[100px] object-cover"
        />
      </div>
    );
  };
  return (
    <div>
      <div
        className="m-4 max-w-[100px] flex items-center justify-center gap-2 bg-gray-400 hover:bg-gray-700 rounded-md cursor-pointer text-white"
        onClick={() => navigate(-1)}
      >
        <span>Back</span>
        <AiOutlineRollback />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {renderUser()}
      </div>
    </div>
  );
}
export default User;
