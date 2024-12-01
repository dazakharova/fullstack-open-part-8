import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import {useApolloClient, useSubscription} from "@apollo/client";
import LoginForm from "./components/LoginForm.jsx";
import RecommendedBooks from "./components/RecommendedBooks.jsx";
import {ALL_BOOKS, BOOK_ADDED} from "./queries.js";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(() => localStorage.getItem('phonenumbers-user-token'));
  const [selectedGenre, setSelectedGenre] = useState('')
  const [message, setMessage] = useState(null)
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: null } }, addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
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

  const Notify = ({message}) => {
    if ( !message ) {
      return null
    }
    return (
        <div style={{color: 'red'}}>
          {message}
        </div>
    )
  }

  return (
    <div>
      <Notify message={message} />
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
