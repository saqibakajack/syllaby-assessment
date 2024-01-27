import { useFormik } from 'formik'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '../components/button'
import { Field } from '../components/field'
import { type User } from '../interfaces/user'
import axios from '../lib/axios'

export default function Profile() {
  const signIn = useSignIn()

  const user = useAuthUser<User>()
  const authHeader = useAuthHeader()

  const navigate = useNavigate()

  const form = useFormik<Partial<User>>({
    initialValues: {
      name: user?.name,
      email: user?.email
    },
    onSubmit: async values => {
      try {
        const { data } = await axios.patch(
          `/users/${user?.id ?? 0}`,
          {
            ...values
          },
          {
            headers: {
              Authorization: authHeader ?? ''
            }
          }
        )

        signIn({
          auth: {
            token: authHeader?.replace('Bearer ', '') ?? '',
            type: 'Bearer'
          },
          userState: data
        })

        toast.success('Profile edited successfully')

        navigate('/books')
      } catch (error: any) {
        toast.error(error.message)
      }
    }
  })

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Profile
          </h2>
        </div>
      </div>

      <form onSubmit={form.handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="grid grid-cols-1 mt-6 gap-y-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <Field
                    label="Name"
                    name="name"
                    type="text"
                    required
                    value={form.values.name}
                    onChange={form.handleChange}
                  />
                </div>

                <div className="sm:col-span-3">
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    value={form.values.email}
                    onChange={form.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            to="/books"
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
          <Button type="submit" disabled={form.isSubmitting}>
            {form.isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  )
}
