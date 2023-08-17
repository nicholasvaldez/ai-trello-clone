import { databases } from "@/appwrite"

// This function fetches a list of todos from the Appwrite database and groups them by column.
export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    // Fetch the list of todos from the Appwrite database.
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  )
  const todos = data.documents

  const columns = todos.reduce((acc, todo) => {
    // Check if there is no current acc/map object
    if (!acc.get(todo.status)) {
      // Set the key-value pair of the map object
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      })
    }
    // push the data into the todos array
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      // get the image if it exists on the todo
      ...(todo.image && { image: todo.image }),
    })

    return acc
  }, new Map<TypedColumn, Column>())
}
