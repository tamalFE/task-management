import { useLiveQuery } from 'dexie-react-hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { db } from '../db';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const [avatar, setAvatar] = useState('/profile.jpg');
  const userId = localStorage.getItem('token').split('-')[0];
  const users = useLiveQuery(() => db.users.toArray());
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');

    navigate('/login');
  };

  useEffect(() => {
    if (!Array.isArray(users)) return;
    const userInfo = users.find((u) => u.userID === Number(userId));
    setAvatar(userInfo?.image);
  }, [users]);

  return (
    <div>
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <NavLink to={'/'} className="btn btn-ghost normal-case text-xl">
            Task Manager
          </NavLink>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={avatar ?? '/profile.jpg'} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to={'/profile'} className="justify-between">
                  Profile
                </NavLink>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
