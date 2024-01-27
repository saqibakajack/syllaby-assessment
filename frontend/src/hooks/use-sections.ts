import { type Section } from '../interfaces/section'

export function useSections() {
  const insertSection = (node: Section, id: string): Section => {
    if (node.id === id) {
      node.sections.push({
        id: Date.now().toString(),
        title: '',
        content: '',
        sections: []
      })

      return node
    }

    let latestNode = []
    latestNode = node.sections.map(ob => {
      return insertSection(ob, id)
    })

    return { ...node, sections: latestNode }
  }

  const deleteSection = (node: Section, id: string): Section => {
    if (node.id === id) {
      return {
        id: node.id,
        title: node.title,
        content: node.content,
        sections: []
      }
    }

    let latestNode = []
    latestNode = node.sections.map(ob => {
      return deleteSection(ob, id)
    })

    return { ...node, sections: latestNode }
  }

  const editSection = (
    node: Section,
    id: string,
    data: { title: string; content: string }
  ): Section => {
    if (node.id === id) {
      node.title = data.title
      node.content = data.content

      return node
    }

    let latestNode = []
    latestNode = node.sections.map(ob => {
      return editSection(ob, id, data)
    })

    return { ...node, sections: latestNode }
  }

  return { insertSection, editSection, deleteSection }
}
