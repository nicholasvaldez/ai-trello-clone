import { databases } from "@/appwrite"

// This function fetches a list of todos from the Appwrite database and groups them by column.
export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    // Fetch the list of todos from the Appwrite database.
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  )
  // Extract the todos from the data object.
  const todos = data.document
  // Use the reduce method to group the todos by column.
  const columns = todos.reduce((acc, todo) => {
    // If the column doesn't exist in the accumulator, create it.
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      })
    }
    // Push the todo into the column.
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    })

    return acc
  }, new Map<TypedColumn, Column>())
}
