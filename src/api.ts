import usersData from "./data/todos.json";

export function getUniqUsersIds() {
  return [...new Set(usersData.map((userData) => userData.userId))];
}

export function getUserToDoList(
  selectedUser: string | number,
  sortedBy: string,
) {
  return handleToDoList(sortedBy).filter(
    (userData) => userData.userId === selectedUser,
  );
}

function handleToDoList(by: string) {
  switch (by) {
    case "ascending":
      return usersData.toSorted((a, b) => a.title.localeCompare(b.title));
    case "descending":
      return usersData.toSorted((a, b) => b.title.localeCompare(a.title));
  }

  return usersData;
}
