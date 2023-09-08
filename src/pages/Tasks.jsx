import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../component/HOC/ProtectedRoute';
import Layout from '../layout/Layout';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

const Tasks = () => {
  const tasks = useLiveQuery(() => db.tasks.toArray());
  const navigate = useNavigate();

  const changeStatus = async (id, status) => {
    try {
      await db.tasks.update(id, { status });
      return;
    } catch (error) {
      console.error(error);
    }
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
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
                          Mark as In Pregress
                        </button>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Tasks;
