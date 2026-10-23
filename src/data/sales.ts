export interface Sale {
  id: string;
  customer: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
}

export const salesData: Sale[] = [
  {
    id: "1",
    customer: "Alice Johnson",
    amount: 250.0,
    status: "completed",
    date: "2026-10-20",
  },
  {
    id: "2",
    customer: "Bob Smith",
    amount: 120.5,
    status: "pending",
    date: "2026-10-19",
  },
  {
    id: "3",
    customer: "Charlie Brown",
    amount: 450.0,
    status: "completed",
    date: "2026-10-19",
  },
  {
    id: "4",
    customer: "Diana Prince",
    amount: 80.0,
    status: "failed",
    date: "2026-10-18",
  },
  {
    id: "5",
    customer: "Ethan Hunt",
    amount: 300.0,
    status: "completed",
    date: "2026-10-18",
  },
  {
    id: "6",
    customer: "Fiona Gallagher",
    amount: 150.0,
    status: "pending",
    date: "2026-10-17",
  },
  {
    id: "7",
    customer: "George Costanza",
    amount: 50.0,
    status: "completed",
    date: "2026-10-17",
  },
];
