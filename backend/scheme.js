const typeDefs = `
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  
  type RecommendedBooksResult {
  books: [Book!]!
  favouriteGenre: String!
}
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (author: String, genre: String): [Book!]!
    recommendedBooks: RecommendedBooksResult!
    allAuthors: [Author!]!
    allGenres: [String!]!
    me: User
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
    name: String! 
    setBornTo: Int!
    ): Author
    createUser(
    username: String!
    favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  
  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs