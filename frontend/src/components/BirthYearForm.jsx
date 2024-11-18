import {useEffect, useState} from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import Select from 'react-select';

const BirthYearForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeAuthor, result ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  let options = authors.map(author => ({
    value: author.name,
    label: author.name
  }));

  const submit = (event) => {
    event.preventDefault()

    changeAuthor({ variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log(('author not found'))
    }
  }, [result.data])

  return (
      <div>
        <h2>Set birthyear</h2>

        <form onSubmit={submit}>
          <Select
              value={name ? options.find(option => option.value === name) : null}
              onChange={(selectedOption) => setName(selectedOption.value)}
              options={options}
          />
          <div>
            born <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
          />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
  )
}

export default BirthYearForm