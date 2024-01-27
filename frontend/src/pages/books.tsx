import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { Link } from 'react-router-dom'
import { useFetch } from 'usehooks-ts'

import BooksList from '../components/books-list'
import Error from '../components/error'
import { type Book } from '../interfaces/book'
import { type User } from '../interfaces/user'

export default function Books() {
  const user = useAuthUser<User>()
  const authHeader = useAuthHeader()

  const { data: books, error } = useFetch<Book[]>(
    `http://localhost:8080/users/${user?.id ?? 0}/books`,
    {
      headers: {
        Authorization: authHeader ?? ''
      }
    }
  )

  if (error != null) {
    return <Error error={error.message} />
  }

  if (books == null) {
    return <p>Loading</p>
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            My Books
          </h2>
        </div>

        <div className="mt-4 flex md:ml-4 md:mt-0">
          <Link
            to="/books/create"
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create New Book
          </Link>
        </div>
      </div>

      <BooksList books={books} />
    </div>
  )
}
