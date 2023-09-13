import { useLiveQuery } from 'dexie-react-hooks';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { db } from '../db';
import { authContext } from '../contexts/auth.context';

const LogInPage = () => {
  //
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(authContext);

  const users = useLiveQuery(() => db.users.toArray());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const found = users.find((u) => u.username === username);

    if (!found) {
      alert('User not Found');
      navigate('/signup');
      return;
    }

    const passwordMatch = found.password === password;

    if (!passwordMatch) {
      alert('Invalid Password');
      return;
    }

    const token = found.userID + '-' + found.username;
    const userInfo = { ...found };
    delete userInfo.password;
    setUser(userInfo);

    localStorage.setItem('token', token);
    navigate('/dashboard');

    return;
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs my-2">
              <label className="label">
                <span className="label-text">Enter your username</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Enter Password</span>
              </label>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="card-actions justify-end mt-2">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
            <NavLink to={'/signup'}>Don't Have an account? | Sign Up</NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
