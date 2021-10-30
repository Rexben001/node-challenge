import { ApiError } from '@nc/utils/errors';
import { getUserExpenses } from '../model';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/get-user-expenses', async (req, res, next) => {
  const [expenseError, userExpenses] = await to(
    getUserExpenses(req.query?.userId)
  );

  if (expenseError) {
    return next(
      new ApiError(
        expenseError,
        expenseError.status,
        `Could not get user expenses: ${expenseError}`,
        expenseError.title,
        req
      )
    );
  }

  if (!userExpenses) {
    return res.json({});
  }

  return res.json(secureTrim(userExpenses));
});
