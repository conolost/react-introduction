export type User = {
  id: number;
  name: string;
};

export const usersUrl = new URL('https://jsonplaceholder.typicode.com/users');

export async function fetchUsers(signal: AbortSignal): Promise<User[]> {
  try {
    const response = await fetch(usersUrl, { signal });
    const data = await response.json();
    return data;
  } catch (error) {
    if (!(error as Error).message.includes('aborted'))
      throw new Error('Users fetch failed: ' + (error as Error).message);
  }
  return [];
}
