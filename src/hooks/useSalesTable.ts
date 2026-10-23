import { useReducer, useMemo } from "react";
import { Sale } from "../data/sales";

// 1. Define the state shape
interface State {
  search: string;
  statusFilter: "all" | "completed" | "pending" | "failed";
  sortBy: keyof Sale;
  sortDesc: boolean;
}

// 2. Define the actions
type Action =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_STATUS"; payload: State["statusFilter"] }
  | { type: "SET_SORT"; payload: keyof Sale };

// 3. The Reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_STATUS":
      return { ...state, statusFilter: action.payload };
    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload,
        sortDesc: state.sortBy === action.payload ? !state.sortDesc : false,
      };
    default:
      return state;
  }
}

// 4. The Custom Hook
export function useSalesTable(initialData: Sale[]) {
  const [state, dispatch] = useReducer(reducer, {
    search: "",
    statusFilter: "all",
    sortBy: "date",
    sortDesc: true,
  });

  // 5. USE MEMO: Only recalculate the filtered data if state or initialData changes
  const filteredData = useMemo(() => {
    let result = [...initialData];

    // Filter by search
    if (state.search) {
      result = result.filter((sale) =>
        sale.customer.toLowerCase().includes(state.search.toLowerCase()),
      );
    }

    // Filter by status
    if (state.statusFilter !== "all") {
      result = result.filter((sale) => sale.status === state.statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      const valA = a[state.sortBy];
      const valB = b[state.sortBy];
      if (valA < valB) return state.sortDesc ? 1 : -1;
      if (valA > valB) return state.sortDesc ? -1 : 1;
      return 0;
    });

    return result;
  }, [initialData, state]);

  return { state, dispatch, filteredData };
}
