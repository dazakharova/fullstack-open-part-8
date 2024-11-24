import { ALL_BOOKS } from '../queries.js';
import { useQuery } from '@apollo/client';
import {useState} from "react";

const Books = (props) => {
  const [ genre, setGenre ] = useState('')

  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!result.data || !result.data.allBooks) {
    return <div>No data available.</div>;
  }

  let books = result.data.allBooks

  let genres = []
  books.forEach(b => {
    b.genres.forEach(g => {
      if (!genres.includes(g)) {
        genres.push(g)
      }
    })
  })

  if (genre) {
    books = books.filter(b => b.genres.includes(genre))
  }

  return (
    <div>
      <h2>books</h2>
      { genre ? (<p>in genre <b>{genre}</b></p>) : <></> }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(genre => {
        return <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      })}
        <button onClick={() => setGenre("")}>all genres</button>
      </div>
    </div>
  )
}

export default Books
