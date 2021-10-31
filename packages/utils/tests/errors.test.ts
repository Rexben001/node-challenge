import {
  BadRequest,
  Conflict,
  Forbidden,
  InternalError,
  NotFound,
  Unauthorized,
} from '../errors';

describe('Error Tyes', () => {
  test('NotFound Error', (done) => {
    const result = NotFound('User does not have any expense');
    expect(result.message).toBe('User does not have any expense');
    expect(result.status).toBe(404);
    done();
  });
  test('InternalError', (done) => {
    const result = InternalError('Error fetching data from the DB');
    expect(result.status).toBe(500);
    done();
  });
  test('return user details', (done) => {
    const result = Conflict('User does not have any expense');
    expect(result.status).toBe(409);
    done();
  });
  test('return user details', (done) => {
    const result = Unauthorized('User is not authorized');
    expect(result.status).toBe(401);
    done();
  });
  test('return user details', (done) => {
    const result = Forbidden('Forbidden');
    expect(result.status).toBe(403);
    done();
  });
  test('return user details', (done) => {
    const result = BadRequest('Bad Request');
    expect(result.status).toBe(400);
    done();
  });
});
