import { useState, useEffect } from 'react';
import './App.css';
import { SortBy } from './components/SortBy';
import { UserSelector } from './components/UserSelector';
import { UserToDoList } from './components/ToDoList';
import { ToDo } from './api';
import { getApiToDoList } from './api/todos';
import { User, getApiUsersList } from './api/users';

function App() {
  const [toDoList, setToDoList] = useState<ToDo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [sortingOrder, setSortingOrder] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<User['id']>(0);
  const [isToDoListLoading, setIsToDoListLoading] = useState(false);
  const [isUsersListLoading, setIsUsersListLoading] = useState(false);

  // fetch ToDo list
  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        setIsToDoListLoading(true);
        const filters = selectedUserId ? { userId: selectedUserId } : undefined;
        const sort = sortingOrder ? { _order: sortingOrder } : undefined;
        const toDoList = await getApiToDoList({ sort, filters }, abortController.signal);
        setToDoList(toDoList);
      } catch (e) {
        console.error((e as Error).message);
      } finally {
        setIsToDoListLoading(false);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [sortingOrder, selectedUserId]);

  // fetch users
  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setIsUsersListLoading(true);

      try {
        const usersList = await getApiUsersList(abortController.signal);
        setUsers(usersList);
      } catch (e) {
        console.error((e as Error).message);
      } finally {
        setIsUsersListLoading(false);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  const isLoading = isToDoListLoading || isUsersListLoading;

  return (
    <div className='App'>
      {isLoading ? (
        <div className='loader'></div>
      ) : (
        <>
          <SortBy sortedBy={sortingOrder} onChange={(e) => setSortingOrder(e.target.value)} />
          <UserSelector
            users={users}
            selectedUser={selectedUserId}
            onChange={(e) => setSelectedUserId(+e.target.value)}
          />
          <UserToDoList todos={toDoList} />
        </>
      )}
    </div>
  );
}

export default App;
