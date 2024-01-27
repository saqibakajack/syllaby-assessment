import { useFormik } from 'formik'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AuthForm } from '../components/auth-form'
import { Button } from '../components/button'
import { Field } from '../components/field'
import { type User } from '../interfaces/user'
import axios from '../lib/axios'

export default function Signin() {
  const signIn = useSignIn()

  const navigate = useNavigate()

  const form = useFormik<{
    email: string
    password: string
  }>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async values => {
      try {
        const { data } = await axios.post<{
          accessToken: string
          user: User
        }>('/login', values)

        signIn({
          auth: {
            token: data.accessToken,
            type: 'Bearer'
          },
          userState: data.user
        })

        toast.success('Login success')

        navigate('/')
      } catch (error: any) {
        toast.error(error.message)
      }
    }
  })

  return (
    <AuthForm
      heading="Welcome to Bookshelf"
      subheading={
        <>
          Not a member?{' '}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign up now
          </Link>
        </>
      }
      onSubmit={form.handleSubmit}
    >
      <Field
        name="email"
        type="email"
        required
        label="Email address"
        value={form.values.email}
        onChange={form.handleChange}
      />
      <Field
        name="password"
        type="password"
        required
        label="Password"
        value={form.values.password}
        onChange={form.handleChange}
      />

      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <label
          htmlFor="remember-me"
          className="ml-3 block text-sm leading-6 text-gray-700"
        >
          Remember me
        </label>
      </div>

      <Button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </AuthForm>
  )
}
