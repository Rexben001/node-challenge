import { ApiError } from '@nc/utils/errors';
import { ExpenseQuery } from '../types';
import { getUserExpenses } from '../model';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';
import { NextFunction, Request, Response, Router } from 'express';
export const router = Router();

router.get(
  '/get-user-expenses',
  async (
    req: Request<{}, {}, {}, ExpenseQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, limit, page, orderBy } = req.query;
    const [expenseError, userExpenses] = await to(
      getUserExpenses({
        userId,
        limit,
        page,
        orderBy,
      })
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

    const result = JSON.parse(secureTrim(userExpenses?.expenses));

    return res.json({
      page: Number(page) || 1,
      totalCount: userExpenses.count,
      userExpenses: result,
    });
  }
);
