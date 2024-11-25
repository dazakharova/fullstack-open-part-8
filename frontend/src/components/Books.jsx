import {ALL_BOOKS, ALL_GENRES} from '../queries.js';
import { useQuery } from '@apollo/client';
import {useState} from "react";

const Books = (props) => {
  const bookResult = useQuery(ALL_BOOKS, {
    variables: { genre: props.selectedGenre || null}
  })

  const genresResult = useQuery(ALL_GENRES)

  if (!props.show) {
    return null
  }

  if (bookResult.loading || genresResult.loading) {
    return <div>loading...</div>
  }

  if (!bookResult.data || !bookResult.data.allBooks ) {
    return <div>No data available.</div>;
  }

  let genres;
  if (!genresResult.data || !genresResult.data.allGenres) {
    genres = []
  } else {
    genres = genresResult.data.allGenres
  }

  let books = bookResult.data.allBooks

  return (
    <div>
      <h2>books</h2>
      { props.selectedGenre ? (<p>in genre <b>{props.selectedGenre}</b></p>) : <></> }
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
        return <button key={genre} onClick={() => props.setSelectedGenre(genre)}>{genre}</button>
      })}
        <button onClick={() => props.setSelectedGenre("")}>all genres</button>
      </div>
    </div>
  )
}

export default Books
