import { type Section } from '../../interfaces/section'
import { Button } from '../button'
import { Field } from '../field'

export function SectionInput({
  section,
  onAdd,
  onDelete,
  onChange,
  isAuthor
}: {
  section: Section
  onChange: (id: string, data: { title: string; content: string }) => void
  onAdd: (id: string) => void
  onDelete: (id: string) => void
  isAuthor: boolean
}) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-4">
      <Field
        label="Title"
        name="title"
        type="text"
        required
        value={section.title}
        onChange={event => {
          onChange(section.id, {
            title: event.target.value,
            content: section.content
          })
        }}
      />

      <Field
        label="Content"
        size="lg"
        required
        value={section.content}
        onChange={event => {
          onChange(section.id, {
            title: section.title,
            content: event.target.value
          })
        }}
      />

      {isAuthor && (
        <div className="inline-flex gap-4">
          <Button
            type="button"
            onClick={() => {
              onAdd(section.id)
            }}
          >
            Add Sub Section
          </Button>

          <button
            className="text-sm font-semibold leading-6 text-red-600"
            type="button"
            onClick={() => {
              onDelete(section.id)
            }}
          >
            Delete Sub Sections
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-y-4 border-l pl-4">
        {section.sections.map(subSection => (
          <SectionInput
            key={subSection.id}
            section={subSection}
            onAdd={onAdd}
            onDelete={onDelete}
            onChange={onChange}
            isAuthor={isAuthor}
          />
        ))}
      </div>
    </div>
  )
}
