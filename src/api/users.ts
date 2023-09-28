export type User = {
  id: number;
  name: string;
};

const usersUrl = 'https://jsonplaceholder.typicode.com/users';

export async function getApiUsersList(signal: AbortSignal): Promise<User[]> {
  try {
    const response = await fetch(usersUrl, { signal });
    return await response.json();
  } catch (error) {
    if (!(error as Error).message.includes('aborted'))
      throw new Error('Users list fetch failed: ' + (error as Error).message);
  }

  return [];
}
