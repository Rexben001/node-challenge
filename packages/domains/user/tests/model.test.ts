import { getUserDetails } from '../model';

describe('User Model', () => {
  test('return user details', async () => {
    const result = await getUserDetails('da140a29-ae80-4f0e-a62d-6c2d2bc8a474');
    expect(result?.first_name).toBe('Jeppe');
    expect(result?.ssn).toBe('1');
  });
});
