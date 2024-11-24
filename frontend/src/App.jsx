import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import {useApolloClient} from "@apollo/client";
import LoginForm from "./components/LoginForm.jsx";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(() => localStorage.getItem('phonenumbers-user-token'));
  const client = useApolloClient();

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? <button onClick={() => setPage("login")}>login</button> : <><button onClick={() => setPage("add")}>add book</button><button onClick={logout}>logout</button></>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm show={page === "login"} setPage={setPage} setToken={setToken} />
    </div>
  );
};

export default App;
