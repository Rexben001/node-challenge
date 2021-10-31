import { getUserExpenses } from '../model';

describe('Expense Model', () => {
  test('return user expenses', async () => {
    const result = await getUserExpenses({
      userId: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
      limit: 2,
    });
    expect(result?.expenses?.length).toBe(2);
    expect(result?.count).toBe(3);
    expect(result?.expenses[1]?.merchant_name).toBe('Cafe 22');
  });
  test('return user expenses', async () => {
    try {
      await getUserExpenses({
        userId: 'da140a29-ae80-4f0e-a62d-93393',
        limit: 2,
      });
    } catch (error) {
      expect(error.message).toMatch(
        /Error fetching data from the DB: invalid input syntax for type uuid/
      );
      expect(error.title).toBe('Internal Server Error');
    }

    // expect(result?.expenses?.length).toBe(2);
    // expect(result?.count).toBe(3);
    // expect(result?.expenses[1]?.merchant_name).toBe('Cafe 22');
  });
});
