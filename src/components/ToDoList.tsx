import { getUserToDoList, ToDo } from '../api';

export function UserToDoList({
  usersData,
  selectedUser,
  sortedBy,
}: {
  usersData: ToDo[];
  selectedUser: number;
  sortedBy: string;
}) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {getUserToDoList(usersData, selectedUser, sortedBy)!.map((userToDo) => {
            return (
              <tr key={userToDo.id}>
                <td>{userToDo.title}</td>
                <td>{userToDo.completed ? 'performed' : 'in progress'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
