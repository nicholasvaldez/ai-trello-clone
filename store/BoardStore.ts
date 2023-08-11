import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn"
import { create } from "zustand"

interface BoardState {
  board: Board
  getBoard: () => void
}
// The BoardStore is a Zustand store that fetches the board from the Appwrite database and stores it in the board property.
export const useBoardStore = create<BoardState>((set) => ({
  // The board property is an object with a columns property that is a Map of TypedColumn and Column
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  // The getBoard method fetches the board from the Appwrite database and stores it in the board property.
  getBoard: async () => {
    const board = await getTodosGroupedByColumn()
    set({ board })
  },
}))
