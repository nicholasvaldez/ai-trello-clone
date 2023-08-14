import { databases } from "@/appwrite"

// This function fetches a list of todos from the Appwrite database and groups them by column.
export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    // Fetch the list of todos from the Appwrite database.
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  )
  console.log(data)
}
