import { ExpenseQuery } from '../types';
import { query } from '@nc/utils/db';

export function readUserExpenses({
  userId,
  limit = 10,
  page,
  orderBy = 'amount_in_cents',
}: ExpenseQuery) {
  return query(
    `SELECT * FROM expenses 
        WHERE user_id = $1 
        ORDER BY 
            CASE WHEN $2 = 'amount_in_cents' THEN expenses.amount_in_cents END, 
            CASE WHEN $2 = 'status'  THEN expenses.status END, 
            CASE WHEN $2 = 'date_created'  THEN expenses.date_created END,
            CASE WHEN $2 = 'merchant_name'  THEN expenses.merchant_name END
        LIMIT $3
        OFFSET (($4 -1) * $3)`,

    [userId, orderBy, limit, Number(page) || 1]
  ).then((response) => response.rows);
}

export function getUserExpensesCount({ userId }: { userId: string }) {
  return query('SELECT COUNT(*) FROM expenses WHERE user_id = $1', [
    userId,
  ]).then((response) => response.rows);
}
