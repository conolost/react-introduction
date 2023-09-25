// import usersData from './data/todos.json';

export default async function getApiData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Response is not OK: ' + error);
  }
}

export function getUniqUsersIds(usersData: any[]) {
  return [...new Set(usersData.map((userData) => userData.userId))];
}

export function getUserToDoList(usersData: any[], selectedUser: string | number, sortedBy: string) {
  return handleToDoList(usersData, sortedBy).filter((userData) => userData.userId === +selectedUser);
}

function handleToDoList(usersData: any[], by: string) {
  switch (by) {
    case 'ascending':
      return usersData.slice().sort((a, b) => a.title.localeCompare(b.title));
    case 'descending':
      return usersData.slice().sort((a, b) => b.title.localeCompare(a.title));
  }

  return usersData;
}
