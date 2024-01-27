import { PlusIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

import { type Book } from '../../interfaces/book'

export default function BooksList({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return (
      <div className="text-center my-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No books</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new book.
        </p>
        <div className="mt-6">
          <Link
            to="/books/new"
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            New Book
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 mt-8"
    >
      {books.map(book => (
        <li key={book.id} className="relative">
          <div className="group aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <img
              src={book.image}
              alt={book.name}
              className="pointer-events-none h-[300px] w-full block object-cover group-hover:opacity-75"
            />
            <Link
              to={`/books/${book.id}`}
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for {book.name}</span>
            </Link>
          </div>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {book.name}
          </p>
          <p className="pointer-events-none block text-sm font-medium text-gray-500">
            {book.description}
          </p>
        </li>
      ))}
    </ul>
  )
}
