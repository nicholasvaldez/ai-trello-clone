import { databases } from "@/appwrite"

/* Fetch a list of todos from the Appwrite database and groups them by column */
export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    // Fetch the list of todos from the Appwrite database.
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  )
  const todos = data.documents

  /* Transform into Map object */

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      })
    }
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: todo.image }),
    })

    return acc
  }, new Map<TypedColumn, Column>())

  /* Ensure columns can hold empty arrays */

  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"]
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      })
    }
  }

  /* Ensure columns are always sorted in the correct order */

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  )

  /* Create new return variable with sorted columns */

  const board: Board = {
    columns: sortedColumns,
  }

  /* Return Board */

  return board
}
