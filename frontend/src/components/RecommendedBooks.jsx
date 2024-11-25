import { RECOMMENDED_BOOKS } from '../queries.js';
import { useQuery } from '@apollo/client';

const RecommendedBooks = (props) => {
  const result = useQuery(RECOMMENDED_BOOKS, {
    skip: !props.show
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!result.data || !result.data.recommendedBooks) {
    return <div>No data available.</div>;
  }

  const { books, favouriteGenre } = result.data.recommendedBooks;

  return (
      <div>
        <h2>recommendations</h2>
        <p>books in your favourite genre <b>{ favouriteGenre }</b></p>
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
      </div>
  )
}

export default RecommendedBooks
