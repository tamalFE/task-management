import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';

const SignUpPage = () => {
  //
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const users = useLiveQuery(() => db.users.toArray());
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      password,
      image: null,
      bio: '',
    };

    // Unique username
    const userFound = users.find((u) => u.username === username);

    if (userFound) {
      alert('User exists!');
      return;
    }

    const userId = await db.users.add(newUser);

    setUsername('');
    setPassword('');

    navigate('/login');
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs my-2">
              <label className="label">
                <span className="label-text">Enter your username (Unique)</span>
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
                Signup
              </button>
            </div>
            <NavLink to={'/login'}>Already Have an account? | Log In</NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
