import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFetch } from 'usehooks-ts'

import { EditBookForm } from '../components/edit-book-form'
import Error from '../components/error'
import { type Book } from '../interfaces/book'
import { type User } from '../interfaces/user'
import axios from '../lib/axios'

export default function EditBook() {
  const { bookId } = useParams()
  const authHeader = useAuthHeader()
  const user = useAuthUser<User>()

  const navigate = useNavigate()

  const { data: book, error } = useFetch<Book>(
    `http://localhost:8080/books/${bookId ?? 0}`,
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

  const handleSubmit = async (values: Partial<Book>) => {
    try {
      await axios.patch(
        `/books/${bookId ?? 0}`,
        {
          ...values
        },
        {
          headers: {
            Authorization: authHeader ?? ''
          }
        }
      )

      toast.success('Book edited successfully')

      navigate(`/books/${bookId ?? 0}`)
    } catch (requestError: any) {
      toast.error(requestError.message)
    }
  }

  return (
    <EditBookForm
      book={{
        name: book.name,
        description: book.description,
        image: book.image,
        sections: [...book.sections]
      }}
      onSubmit={handleSubmit}
      isAuthor={user?.id === book.userId}
    />
  )
}
