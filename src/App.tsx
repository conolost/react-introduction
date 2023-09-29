import { useState, useEffect } from 'react';
import './App.css';
import { SortBy } from './components/SortBy';
import { UserSelector } from './components/UserSelector';
import { UserToDoList } from './components/ToDoList';
import { getApiData, ToDo } from './api';

function App() {
  const [usersData, setUsersData] = useState<ToDo[]>([]);
  const [sortedBy, setSortedBy] = useState('default');
  const [selectedUser, setSelectedUser] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchToDos = async () => {
      setIsLoading(true);
      let result = await getApiData(abortController.signal);
      setUsersData(result);
      setIsLoading(false);
    };
    fetchToDos();
    return () => {
      abortController.abort();
    };
  }, [sortedBy]);

  return (
    <div className='App'>
      {isLoading ? (
        <div className='loader'></div>
      ) : (
        <>
          <SortBy sortedBy={sortedBy} onChange={(e) => setSortedBy(e.target.value)} />
          <UserSelector
            usersData={usersData}
            selectedUser={selectedUser}
            onChange={(e) => setSelectedUser(+e.target.value)}
          />
          <UserToDoList usersData={usersData} selectedUser={selectedUser} sortedBy={sortedBy} />
        </>
      )}
    </div>
  );
}

export default App;
