import { getUserToDoList, ToDo } from '../api';

export function UserToDoList({
  usersData,
  selectedUser,
  sortedBy,
}: {
  usersData: ToDo[];
  selectedUser: string;
  sortedBy: string;
}) {
  return (
    <>
      {getUserToDoList(usersData, selectedUser, sortedBy)!.map((userToDo) => {
        return (
          <div key={userToDo.id} className='todo'>
            <p>Title: {userToDo.title}</p>
            <p>Status: {userToDo.completed ? 'performed' : 'in progress'}</p>
          </div>
        );
      })}
    </>
  );
}
