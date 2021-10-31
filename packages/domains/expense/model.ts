import { format } from './formatter';
import { to } from '@nc/utils/async';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { ExpenseQuery, UserExpenses } from './types';
import { getUserExpensesCount, readUserExpenses } from './data/db-expense';

export async function getUserExpenses({
  userId,
  limit,
  page,
  orderBy,
}: ExpenseQuery): Promise<UserExpenses> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [[dbError, rawUserExpenses], [countError, totalCount]] =
    await Promise.all([
      await to(readUserExpenses({ userId, limit, page, orderBy })),
      await to(getUserExpensesCount({ userId })),
    ]);

  if (dbError || countError) {
    throw InternalError(
      `Error fetching data from the DB: ${(dbError || countError).message}`
    );
  }

  if (!rawUserExpenses) {
    throw NotFound('User does not have any expense');
  }

  return {
    expenses: rawUserExpenses.map((rawExpense) => format(rawExpense)),
    count: totalCount[0]?.count || 0,
  };
}
