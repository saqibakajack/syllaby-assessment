import { type ChangeEvent, type PropsWithChildren } from 'react'

export function Field(
  properties: PropsWithChildren<{
    label: string
    name?: string
    type?: string
    required?: boolean
    value?: string
    onChange?: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
    size?: 'sm' | 'lg'
  }>
) {
  return (
    <div>
      <label
        htmlFor={properties.name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {properties.label}
      </label>
      <div className="mt-2">
        {properties.size === 'lg' ? (
          <textarea
            id={properties.name}
            name={properties.name}
            value={properties.value}
            required={properties.required ?? false}
            onChange={properties.onChange}
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        ) : (
          <input
            id={properties.name}
            name={properties.name}
            type={properties.type}
            value={properties.value}
            onChange={properties.onChange}
            required={properties.required ?? false}
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        )}
      </div>
    </div>
  )
}
