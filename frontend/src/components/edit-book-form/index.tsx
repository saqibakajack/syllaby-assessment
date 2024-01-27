import { useFormik } from 'formik'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useSections } from '../../hooks/use-sections'
import { type Book } from '../../interfaces/book'
import { type Section } from '../../interfaces/section'
import { Button } from '../button'
import { Field } from '../field'
import { SectionInput } from '../section-input'

export function EditBookForm({
  book,
  onSubmit,
  isAuthor
}: {
  book: Partial<Book>
  onSubmit: (values: Partial<Book>) => Promise<void>
  isAuthor: boolean
}) {
  const [sections, setSections] = useState<Section[]>([
    ...(book.sections ?? [])
  ])

  const { insertSection, editSection, deleteSection } = useSections()

  const form = useFormik<Partial<Book>>({
    initialValues: {
      name: book.name,
      description: book.description,
      image: book.image,
      collaborators: book.collaborators
    },
    onSubmit: async values => {
      try {
        await onSubmit({
          ...values,
          sections
        })
      } catch (error: any) {
        console.log(error)
      }
    }
  })

  const insertNewSection = () => {
    const node = {
      id: Date.now().toString(),
      title: '',
      content: '',
      sections: []
    }

    setSections(previous => [...previous, node])
  }

  const clearSections = () => {
    setSections([
      {
        id: Date.now().toString(),
        title: '',
        content: '',
        sections: []
      }
    ])
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Create New Book
          </h2>
        </div>
      </div>

      <form onSubmit={form.handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 mt-10">
              Details
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Provide the details of the book here
            </p>

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
                    label="Image URL"
                    name="image"
                    type="text"
                    required
                    value={form.values.image}
                    onChange={form.handleChange}
                  />
                </div>
              </div>

              <Field
                label="Description"
                name="description"
                size="lg"
                required
                value={form.values.description}
                onChange={form.handleChange}
              />

              {isAuthor && (
                <Field
                  label="Collaborators (Comma seprated)"
                  name="collaborators"
                  type="text"
                  required
                  value={form.values.collaborators?.join(', ')}
                  onChange={event => {
                    const collaborators = event.target.value
                      .split(',')
                      .map(item => +item.trim())

                    /* eslint-disable @typescript-eslint/no-floating-promises */
                    form.setFieldValue('collaborators', collaborators)
                  }}
                />
              )}
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Content
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Add different sections and subsections of the book here.
                </p>
              </div>

              {isAuthor && (
                <div className="flex gap-4">
                  <Button type="button" onClick={insertNewSection}>
                    Add Section
                  </Button>

                  <button
                    className="text-sm font-semibold leading-6 text-red-600"
                    type="button"
                    onClick={() => {
                      clearSections()
                    }}
                  >
                    Clear Sections
                  </button>
                </div>
              )}
            </div>

            {sections.map(section => (
              <div
                key={section.id}
                className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 border-l pl-4"
              >
                <SectionInput
                  section={section}
                  isAuthor={isAuthor}
                  onAdd={(id: string) => {
                    const node = insertSection(section, id)
                    setSections(previous =>
                      previous.map(ob => {
                        if (ob.id === section.id) {
                          return node
                        }

                        return ob
                      })
                    )
                  }}
                  onDelete={(id: string) => {
                    const node = deleteSection(section, id)
                    setSections(previous =>
                      previous.map(ob => {
                        if (ob.id === section.id) {
                          return node
                        }

                        return ob
                      })
                    )
                  }}
                  onChange={(
                    id: string,
                    data: { title: string; content: string }
                  ) => {
                    const node = editSection(section, id, data)
                    setSections(previous =>
                      previous.map(ob => {
                        if (ob.id === section.id) {
                          return node
                        }

                        return ob
                      })
                    )
                  }}
                />
              </div>
            ))}
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
