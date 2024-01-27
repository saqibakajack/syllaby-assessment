import { type JSX, type PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from '../logo'

export function AuthForm({
  heading,
  subheading,
  children,
  onSubmit
}: PropsWithChildren<{
  heading: string
  subheading: JSX.Element
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}>) {
  return (
    <div className="flex min-h-screen flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link to="/">
              <Logo color="indigo" />
            </Link>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {heading}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">{subheading}</p>
          </div>

          <div className="mt-10">
            <form className="space-y-6" onSubmit={onSubmit}>
              {children}
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </div>
  )
}
