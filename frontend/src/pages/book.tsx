import { PencilIcon } from '@heroicons/react/20/solid'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from 'usehooks-ts'

import Error from '../components/error'
import SectionList from '../components/section-list'
import { type Book } from '../interfaces/book'
import { type User } from '../interfaces/user'

export default function BookPage() {
  const { bookId } = useParams()
  const user = useAuthUser<User>()
  const authHeader = useAuthHeader()

  const { data: book, error } = useFetch<Book>(
    `http://localhost:8080/books/${bookId ?? ''}`,
    {
      headers: {
        Authorization: authHeader ?? ''
      }
    }
  )

  if (error != null) {
    return <Error error={error.message} />
  }

  if (book == null) {
    return <p>Loading</p>
  }

  return (
    <div>
      <div className="min-w-0 flex w-full justify-between">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {book.name}
        </h2>

        <div className="mt-4 inline-flex md:ml-4 md:mt-0">
          <Link
            to={`/books/edit/${book.id}`}
            className="rounded-full bg-indigo-600 w-8 h-8 flex justify-center items-center text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PencilIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <p className="text-base font-semibold leading-7 text-indigo-600 mt-4">
        Author: {user?.name}
      </p>

      <div className="py-4 rounded-xl overflow-hidden mb-8">
        <img
          className="rounded-xl h-[40vh] object-cover w-full bg-gray-900 ring-1 ring-gray-400/10"
          src={book.image}
          alt={book.name}
        />
      </div>

      <div className="bg-white">
        <div className="lg:pr-4">
          <SectionList sections={book.sections} />
        </div>
      </div>
    </div>
  )
}
