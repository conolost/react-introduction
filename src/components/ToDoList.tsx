import { getUserToDoList } from '../api';

export default function UserToDoList({ selectedUser, sortedBy }: { selectedUser: string; sortedBy: string }) {
  return (
    <>
      {getUserToDoList(selectedUser, sortedBy)!.map((userToDo) => {
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
