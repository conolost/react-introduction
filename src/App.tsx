import { useState, useEffect } from 'react';
import './App.css';
import { SortBy } from './components/SortBy';
import { UserSelector } from './components/UserSelector';
import { UserToDoList } from './components/ToDoList';
import { fetchToDos, ToDo } from './api/todos';
import { fetchUsers, User } from './api/users';
import { Pagination } from './components/Pagination';

function App() {
  const [isToDosLoading, setIsToDosLoading] = useState(false);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [sortingOrder, setSortingOrder] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<User['id']>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
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
      let { data, totalCount } = await fetchToDos(
        { sortingOrder, selectedUserId, page: currentPage },
        abortController.signal
      );
      setToDos(data);
      setTotalCount(totalCount);
      setIsToDosLoading(false);
    })();
    return () => {
      abortController.abort();
    };
  }, [sortingOrder, selectedUserId, currentPage]);

  return (
    <div className='App'>
      <SortBy sortingOrder={sortingOrder} onChange={(e) => setSortingOrder(e.target.value)} />
      <UserSelector users={users} selectedUser={selectedUserId} onChange={(e) => setSelectedUserId(+e.target.value)} />
      <Pagination pagesNumber={Math.ceil(totalCount / 10)} currentPage={currentPage} onPageChange={setCurrentPage} />
      {isToDosLoading || isUsersLoading ? (
        <div className='loader'></div>
      ) : (
        <>
          <UserToDoList toDos={toDos} />
        </>
      )}
    </div>
  );
}

export default App;
