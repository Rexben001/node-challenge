import { Api } from '../utils/api';

describe('User Domain Acceptance Tests', () => {
  describe('get-user-details endpoint', () => {
    test('/expense/v1/get-user-expenses should return 3 user expenses', async () => {
      const response = await Api.get(
        '/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474'
      );
      const { userExpenses } = response.body;

      expect(response.status).toBe(200);
      expect(userExpenses.length).toBe(3);
      expect(userExpenses[0].merchant_name).toBe('Donkey Republic');
      expect(userExpenses[0].amount_in_cents).toBe(6000);
      expect(userExpenses[0].status).toBe('processed');
    });

    test('/expense/v1/get-user-expenses should return 1 user expense', async () => {
      const response = await Api.get(
        '/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=1'
      );
      const { userExpenses } = response.body;

      expect(response.status).toBe(200);
      expect(userExpenses.length).toBe(1);
    });

    test('/expense/v1/get-user-expenses should return sorted result', async () => {
      const response = await Api.get(
        '/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&orderBy=merchant_name'
      );
      const { userExpenses } = response.body;

      expect(response.status).toBe(200);
      expect(userExpenses[0].merchant_name).toBe('Cafe 22');
      expect(userExpenses[0].amount_in_cents).toBe(8000);
      expect(userExpenses[0].status).toBe('pending');
    });

    test('/expense/v1/get-user-expenses should return zero results', async () => {
      const response = await Api.get(
        '/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&page=2'
      );
      const { userExpenses, page } = response.body;

      expect(response.status).toBe(200);
      expect(page).toBe(2);
      expect(userExpenses.length).toBe(0);
    });

    test('/expense/v1/get-user-expenses should return error', async () => {
      const response = await Api.get(
        '/expense/v1/get-user-expenses?userId=12345'
      );
      expect(response.status).toBe(500);
      expect(response.body.title).toBe('Internal Server Error');
      expect(response.body.message).toMatch(
        /Error fetching data from the DB: invalid input syntax for type uuid/
      );
    });

    test('/expense/v1/get-user-expenses should return 400 error', async () => {
      const response = await Api.get('/expense/v1/get-user-expenses');
      expect(response.status).toBe(400);
      expect(response.body.title).toBe('Bad Request');
      expect(response.body.message).toBe(
        'Could not get user expenses: Error: userId property is missing.'
      );
    });
  });
});
