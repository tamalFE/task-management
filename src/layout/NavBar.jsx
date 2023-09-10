import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../contexts/auth.context';

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useContext(authContext);

  const logout = () => {
    localStorage.removeItem('token');

    navigate('/login');
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <NavLink to={'/'} className="btn btn-ghost normal-case text-xl">
            Task Manager
          </NavLink>
        </div>
        <div className="flex-none gap-2">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/tasks">Tasks</NavLink>
            </li>
            <li>
              <NavLink to="/teams">Teams</NavLink>
            </li>
          </ul>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.image ?? '/person.png'} />
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
                <NavLink to="/tasks">Tasks</NavLink>
              </li>
              <li>
                <NavLink to="/teams">Teams</NavLink>
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
