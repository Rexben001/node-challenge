import { Api } from '../utils/api';

describe('User Domain Acceptance Tests', () => {
  describe('get-user-details endpoint', () => {
    test('/user/v1/get-user-details should return user details', async () => {
      const response = await Api.get(
        '/user/v1/get-user-details?userId=e17825a6-ad80-41bb-a76b-c5ee17b2f29d'
      );

      expect(response.status).toBe(200);
      expect(response.body.first_name).toBe('Petr');
      expect(response.body.last_name).toBe('Janda');
      expect(response.body.company_name).toBe('pleo');
    });

    test('/user/v1/get-user-details should return error for user not found', async () => {
      const response = await Api.get(
        '/user/v1/get-user-details?userId=e17825a6-ad80-41bb-a76b-c5ff17b2f29d'
      );
      expect(response.status).toBe(404);
      expect(response.body.title).toBe('Not Found');
      expect(response.body.message).toMatch(/Could not find user with id/);
    });

    test('/user/v1/get-user-details should return error for invalid uuid type', async () => {
      const response = await Api.get('/user/v1/get-user-details?userId=12345');
      expect(response.status).toBe(500);
      expect(response.body.title).toBe('Internal Server Error');
      expect(response.body.message).toMatch(
        /Error fetching data from the DB: invalid input syntax for type uuid/
      );
    });

    test('/user/v1/get-user-details should return 400 error', async () => {
      const response = await Api.get('/user/v1/get-user-details');
      expect(response.status).toBe(400);
      expect(response.body.title).toBe('Bad Request');
      expect(response.body.message).toBe(
        'Could not get user details: Error: userId property is missing.'
      );
    });
  });
});
