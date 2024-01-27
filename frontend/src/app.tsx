import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import AuthProvider from 'react-auth-kit'
import createStore from 'react-auth-kit/createStore'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Book from './pages/book'
import Books from './pages/books'
import CreateBook from './pages/create-book'
import Dashboard from './pages/dashboard'
import EditBook from './pages/edit-book'
import NotFoundPage from './pages/not-found-page'
import Profile from './pages/profile'
import SharedBooks from './pages/shared-books'
import Signin from './pages/signin'
import Signup from './pages/signup'

const store = createStore<{
  id: number
  name: string
  email: string
}>({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:'
})

export function App() {
  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<AuthOutlet fallbackPath="/signin" />}>
            <Route element={<Dashboard />}>
              <Route path="/books" element={<Books />} />
              <Route path="/books/create" element={<CreateBook />} />
              <Route path="/books/shared" element={<SharedBooks />} />
              <Route path="/books/:bookId" element={<Book />} />
              <Route path="/books/edit/:bookId" element={<EditBook />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
