import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import {useApolloClient} from "@apollo/client";
import LoginForm from "./components/LoginForm.jsx";
import RecommendedBooks from "./components/RecommendedBooks.jsx";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(() => localStorage.getItem('phonenumbers-user-token'));
  const [selectedGenre, setSelectedGenre] = useState('')
  const client = useApolloClient();

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const LoggedInOptions = () => {
    return (
        <>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommend")}>recommend</button>
          <button onClick={logout}>logout</button>
        </>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? <button onClick={() => setPage("login")}>login</button> : <LoggedInOptions />}
      </div>

      <Authors show={page === "authors"} />

      <Books selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} show={page === "books"} />

      <RecommendedBooks show={page === "recommend"} />

      <NewBook selectedGenre={selectedGenre} show={page === "add"} />

      <LoginForm show={page === "login"} setPage={setPage} setToken={setToken} />
    </div>
  );
};

export default App;
