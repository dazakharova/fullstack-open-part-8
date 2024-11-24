import BirthYearForm from './BirthYearForm.jsx';
import { ALL_AUTHORS } from '../queries.js'
import { useQuery } from '@apollo/client'

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!result.data || !result.data.allAuthors) {
    return <div>No data available.</div>;
  }


  const authors = result.data.allAuthors

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
      <BirthYearForm authors={authors} />
    </>
  )
}

export default Authors
