import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { EditBookForm } from '../components/edit-book-form'
import { type Book } from '../interfaces/book'
import { type User } from '../interfaces/user'
import axios from '../lib/axios'

export default function CreateBook() {
  const user = useAuthUser<User>()
  const authHeader = useAuthHeader()

  const navigate = useNavigate()

  const handleSubmit = async (values: Partial<Book>) => {
    try {
      const { data } = await axios.post<Book>(
        '/books',
        {
          ...values,
          userId: user?.id,
          collaborators: []
        },
        {
          headers: {
            Authorization: authHeader ?? ''
          }
        }
      )

      toast.success('Book created successfully')

      navigate(`/books/${data.id}`)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <EditBookForm
      book={{
        name: '',
        description: '',
        image: '',
        sections: [
          {
            id: Date.now().toString(),
            title: '',
            content: '',
            sections: []
          }
        ]
      }}
      onSubmit={handleSubmit}
      isAuthor={true}
    />
  )
}
