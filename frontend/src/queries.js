import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`

export const ALL_BOOKS = gql`
  query Query($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }  
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    published
    author {
      name
      born
    }
    id
  }
}
`

export const EDIT_AUTHOR = gql`
  mutation changeAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const RECOMMENDED_BOOKS = gql`
  query {
    recommendedBooks {
      books {
        title
        published
        author {
          name
          born
        }
        genres
      }
      favouriteGenre
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres 
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`

