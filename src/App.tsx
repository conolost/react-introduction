import { useState, useEffect } from 'react';
import './App.css';
import SortBy from './components/SortBy';
import UserSelctr from './components/UserSelector';
import ToDoLst from './components/ToDoList';
import getApiData from './api';

function App() {
  const [selectedUser, setSelectedUser] = useState('1');
  const [sortedBy, setSortedBy] = useState('default');
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchToDos = async () => {
      setIsLoading(true);
      let result = await getApiData();
      setUsersData(result);
      setIsLoading(false);
    };
    fetchToDos();
  }, []);

  return (
    <div className='App'>
      {isLoading ? (
        <div className='loader'></div>
      ) : (
        <>
          <SortBy sortedBy={sortedBy} onChange={(e) => setSortedBy(e.target.value)} />
          <UserSelctr
            usersData={usersData}
            selectedUser={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          ></UserSelctr>
          <ToDoLst usersData={usersData} selectedUser={selectedUser} sortedBy={sortedBy}></ToDoLst>
        </>
      )}
    </div>
  );
}

export default App;
