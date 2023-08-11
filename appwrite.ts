import { Client, Account, ID, Databases, Storage } from "appwrite"

// Initialize the client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // The API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!) // Project ID

// Initialize services
const account = new Account(client)
const databases = new Databases(client)
const storage = new Storage(client)

// Export the client
export { client, account, databases, storage, ID }
