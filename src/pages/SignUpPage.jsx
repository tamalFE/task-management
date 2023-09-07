import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const SignUpPage = () => {
  //
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usersStr = localStorage.getItem('users');

    const users = usersStr ? JSON.parse(usersStr) : [];

    const userID = uuid();

    const newUser = {
      userID,
      username,
      password,
      image: null,
      bio: '',
    };

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

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
              />
            </div>
            <div className="card-actions justify-end mt-2">
              <button className="btn btn-primary" type="submit">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
