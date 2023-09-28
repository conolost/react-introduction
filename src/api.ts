export const url = new URL('https://jsonplaceholder.typicode.com/todos');
export type ToDo = {
  userId: number;
  title: string;
  id: number;
  completed: boolean;
};

export async function getApiData(signal: AbortSignal): Promise<ToDo[]> {
  try {
    const response = await fetch(url, { signal });
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

export function getUserToDoList(usersData: ToDo[], selectedUser: number, sortedBy: string) {
  if (selectedUser === 0) return handleToDoList(usersData, sortedBy);
  return handleToDoList(usersData, sortedBy).filter((user) => user.userId === selectedUser);
}

function handleToDoList(usersData: ToDo[], by: string) {
  url.searchParams.set('_sort', 'title');
  switch (by) {
    case 'ascending':
      url.searchParams.set('_order', 'asc');
      return usersData;

    case 'descending':
      url.searchParams.set('_order', 'desc');
      return usersData;
  }
  if (url.searchParams.has('_sort')) url.searchParams.delete('_sort');
  return usersData;
}
