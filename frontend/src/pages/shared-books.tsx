import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useFetch } from 'usehooks-ts'

import BooksList from '../components/books-list'
import Error from '../components/error'
import { type Book } from '../interfaces/book'
import { type User } from '../interfaces/user'

export default function SharedBooks() {
  const user = useAuthUser<User>()
  const authHeader = useAuthHeader()

  const { data: books, error } = useFetch<Book[]>(
    `http://localhost:8080/shared/books?userId=${user?.id ?? 0}`,
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
            Shared Books
          </h2>
        </div>
      </div>

      <BooksList books={books} />
    </div>
  )
}
