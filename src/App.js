import { useEffect, useState } from 'react';
import './App.css';
import Task from './components/Task';
import { statuses, getIssue } from './task';


function App() {
  const [issue, setIssue] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null);

  const [showSubTask, setShowSubTask] = useState(false);

  useEffect(() => {
    fetchIssue();
  }, []);

  const fetchIssue = async () => {
    setIsLoading(true);
    try {
      const issue = await getIssue();
      setIsLoading(false);
      setIssue(issue);
    } catch (error) {
      setError(new Error('something went wrong!'))
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div>
        Loading Issue...
      </div>
    )
  }

  if (error) {
    return (
      <div>
        {error.message}
      </div>
    )
  }

  const updateStatus = (updatedStatus) => setIssue(issue => ({ ...issue, status: updatedStatus }));

  const selectedIndex = statuses.findIndex(status => status === issue.status);

  console.log(issue);

  return (
    issue ? <div className="App">

      <Task title={issue.title} menuOptions={statuses} selectedIndex={selectedIndex} updateStatus={updateStatus} />

      <div style={{ marginTop: 10 }}>
        <a title={`${issue?.subtasks?.length} Subtasks`} href='/#' onClick={() => setShowSubTask(flag => !flag)}>Show Subtasks</a>
        {showSubTask && <ul>
          {issue?.subtasks?.map(subtask => <li>{subtask}</li>) ?? null}
        </ul>}
      </div>

    </div> : null
  );
}

export default App;
