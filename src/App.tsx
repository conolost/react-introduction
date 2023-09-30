import { useState, useEffect } from 'react';
import './App.css';
import { SortBy } from './components/SortBy';
import { UserSelector } from './components/UserSelector';
import { UserToDoList } from './components/ToDoList';
import { fetchToDos, ToDo } from './api/todos';
import { fetchUsers, User } from './api/users';

function App() {
  const [isToDosLoading, setIsToDosLoading] = useState(false);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [sortingOrder, setSortingOrder] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<User['id']>(0);

  //getting users
  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      setIsUsersLoading(true);
      let result = await fetchUsers(abortController.signal);
      setUsers(result);
      setIsUsersLoading(false);
    })();
    return () => {
      abortController.abort();
    };
  }, []);

  //getting todos
  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setIsToDosLoading(true);
      let result = await fetchToDos({ sortingOrder, selectedUserId }, abortController.signal);
      setToDos(result);
      setIsToDosLoading(false);
    })();
    return () => {
      abortController.abort();
    };
  }, [sortingOrder, selectedUserId]);

  return (
    <div className='App'>
      {isToDosLoading || isUsersLoading ? (
        <div className='loader'></div>
      ) : (
        <>
          <SortBy sortingOrder={sortingOrder} onChange={(e) => setSortingOrder(e.target.value)} />
          <UserSelector
            users={users}
            selectedUser={selectedUserId}
            onChange={(e) => setSelectedUserId(+e.target.value)}
          />
          <UserToDoList toDos={toDos} />
        </>
      )}
    </div>
  );
}

export default App;
