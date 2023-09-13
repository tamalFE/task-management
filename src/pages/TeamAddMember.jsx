import { useState } from 'react';
import ProtectedRoute from '../component/HOC/ProtectedRoute';
import Layout from '../layout/Layout';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { useLocation, useNavigate } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';

const TeamAddMember = () => {
  //
  const [selected, setSelected] = useState([]);
  const users = useLiveQuery(() => db.users.toArray());
  const teams = useLiveQuery(() => db.teams.toArray());
  const navigate = useNavigate();
  const options = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mapped = selected.map((m) => m.value);

    if (!options || !options.state) return;

    const teamId = Number(options.state);
    const { members } = teams.find((t) => t.teamID === teamId);

    members.push(...mapped);

    const unique = [...new Set(members)];

    const updated = await db.teams.update(teamId, { members: unique });

    navigate('/teams');
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
                  <MultiSelect
                    options={
                      users
                        ? users.map((u) => ({
                            label: u.username.toUpperCase(),
                            value: u.username,
                          }))
                        : []
                    }
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                  />

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

export default TeamAddMember;
