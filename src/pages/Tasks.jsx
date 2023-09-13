import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../component/HOC/ProtectedRoute';
import Layout from '../layout/Layout';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { useContext, useEffect, useRef, useState } from 'react';
import { authContext } from '../contexts/auth.context';

const Tasks = () => {
  const [selected, setSelected] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const users = useLiveQuery(() => db.users.toArray());
  const tasks = useLiveQuery(() => db.tasks.toArray());
  const teams = useLiveQuery(() => db.teams.toArray());
  const navigate = useNavigate();
  const dialogRef = useRef(null);

  const userinfo = useContext(authContext);

  const changeStatus = async (id, status) => {
    try {
      await db.tasks.update(id, { status });
      return;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userinfo || !teams) return;
    const teamFound = teams.find((t) => {
      const members = t.members;

      const found = members.find((m) => m === userinfo?.user?.username);

      if (!found) return;
      return found;
    });

    if (!teamFound) return;
    setTeamMembers(teamFound.members);
  }, [userinfo, teams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await db.tasks.update(taskId, { assignedTo: selected });

    dialogRef.current.close();
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="p-3">
          <div className="w-full flex">
            <h2 className="text-xl my-2">All Tasks</h2>
            <button
              className="btn ml-auto btn-accent"
              type="button"
              onClick={() => navigate('/tasks/create')}
            >
              Add Task
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Assigned to</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(tasks) &&
                  tasks.map((task, i) => (
                    <tr key={task.taskID}>
                      <td>{i + 1}</td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">{task.title}</div>
                          </div>
                        </div>
                      </td>
                      <td>{task.description}</td>
                      <td>{task.priority}</td>
                      <td>{task.date}</td>
                      <td>{task.status}</td>
                      <td>{task.assignedTo.toUpperCase()}</td>
                      <th>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => changeStatus(task.taskID, 'Complete')}
                        >
                          Mark as Complete
                        </button>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() =>
                            changeStatus(task.taskID, 'In Progress')
                          }
                        >
                          Mark as In Progress
                        </button>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => {
                            setTaskId(task.taskID);
                            dialogRef.current.show();
                          }}
                        >
                          Assign to
                        </button>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <dialog ref={dialogRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Assign task to a member</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full my-2">
                <select
                  className="select select-bordered"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option disabled>Select member</option>
                  {teamMembers.map((m) => (
                    <option value={m} key={m}>
                      {m.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" type="submit">
                  Assign
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </Layout>
    </ProtectedRoute>
  );
};

export default Tasks;
