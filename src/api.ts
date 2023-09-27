export type ToDo = {
  userId: number;
  title: string;
  id: number;
  completed: boolean;
};

export default async function getApiData(signal: AbortSignal): Promise<ToDo[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', { signal });
    const data = await response.json();
    return data;
  } catch (error) {
    if (!(error as Error).message.includes('aborted'))
      throw new Error('ToDo fetch failed: ' + (error as Error).message);
  }
  return [];
}

export function getUniqUsersIds(usersData: ToDo[]) {
  return [...new Set(usersData.map((userData) => userData.userId))];
}

export function getUserToDoList(usersData: ToDo[], selectedUser: string | number, sortedBy: string) {
  return handleToDoList(usersData, sortedBy).filter((userData) => userData.userId === +selectedUser);
}

function handleToDoList(usersData: ToDo[], by: string) {
  switch (by) {
    case 'ascending':
      return usersData.slice().sort((a, b) => a.title.localeCompare(b.title));
    case 'descending':
      return usersData.slice().sort((a, b) => b.title.localeCompare(a.title));
  }

  return usersData;
}
