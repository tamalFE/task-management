import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../component/HOC/ProtectedRoute';
import Layout from '../layout/Layout';
import { db } from '../db';

const CreateTeam = () => {
  //
  const [teamName, setTeamName] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTeam = {
      teamName,
      type,
      members: [],
    };

    const teamId = await db.teams.add(newTeam);
    navigate('/teams');
    return;
  };

  return (
    <div>
      <ProtectedRoute>
        <Layout>
          <div className="p-3">
            <form onSubmit={handleSubmit}>
              <div className="card w-2/3 bg-base-100 shadow-xl mx-auto">
                <div className="card-body">
                  <h2 className="text-2xl">Add Members</h2>
                  <div className="form-control w-full my-2">
                    <label className="label">
                      <span className="label-text">Team Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </div>
                  <div className="form-control w-full my-2">
                    <label className="label">
                      <span className="label-text">Type</span>
                    </label>

                    <select
                      className="select select-bordered w-full"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="select">--Select Type--</option>
                      {['frontend', 'backend', 'devops', 'IOS', 'android'].map(
                        (t) => (
                          <option value={t.toUpperCase()} key={t}>
                            {t.toUpperCase()}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" type="submit">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Layout>
      </ProtectedRoute>
    </div>
  );
};

export default CreateTeam;
