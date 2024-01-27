import { type Section } from '../../interfaces/section'

export default function SectionList({ sections }: { sections: Section[] }) {
  return (
    <div className="pl-2">
      {sections.map(section => (
        <div key={section.id} className="my-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              {section.title}
            </h1>
            <p className="mt-2 text-xl leading-8 text-gray-700">
              {section.content}
            </p>
          </div>

          {section.sections != null && section.sections.length > 0 && (
            <SectionList sections={section.sections} />
          )}
        </div>
      ))}
    </div>
  )
}
