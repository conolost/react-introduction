import { useState, useEffect } from 'react';
import './App.css';
import { SortBy } from './components/SortBy';
import { UserSelector } from './components/UserSelector';
import { UserToDoList } from './components/ToDoList';
import getApiData, { ToDo } from './api';

function App() {
  const [selectedUser, setSelectedUser] = useState('1');
  const [sortedBy, setSortedBy] = useState('default');
  const [usersData, setUsersData] = useState<ToDo[]>([]);
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
  }, []);

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
            onChange={(e) => setSelectedUser(e.target.value)}
          ></UserSelector>
          <UserToDoList usersData={usersData} selectedUser={selectedUser} sortedBy={sortedBy}></UserToDoList>
        </>
      )}
    </div>
  );
}

export default App;
