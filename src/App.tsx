import { useState } from "react";
import "./App.css";
import SortBy from "./components/SortBy";
import UserSelctr from "./components/UserSelector";
import ToDoLst from "./components/ToDoList";

function App() {
  const [selectedUser, setSelectedUser] = useState(1);
  const [sortedBy, setSortedBy] = useState("default");

  return (
    <>
      <div className="App">
        <SortBy
          sortedBy={sortedBy}
          onChange={(e) => setSortedBy(e.target.value)}
        />
        <UserSelctr
          selectedUser={selectedUser}
          onChange={(e) => setSelectedUser(+e.target.value)}
        ></UserSelctr>
        <ToDoLst selectedUser={selectedUser} sortedBy={sortedBy}></ToDoLst>
      </div>
    </>
  );
}

export default App;
