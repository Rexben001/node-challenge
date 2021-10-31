export interface Expense {
  id: string;
  merchant_name: string;
  amount_in_cents: number;
  currency: string;
  user_id: string;
  date_created: string;
  status: string;
}

export interface UserExpenses {
  expenses: Expense[];
  count: number;
}

export interface ExpenseQuery {
  userId?: string;
  limit?: number;
  page?: number;
  orderBy?: string;
}
