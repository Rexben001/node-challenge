import { format, secureTrim } from '../formatter';

describe('[Packages | Expense-domain | Formatter] secureTrim', () => {
  test('secureTrim should remove fields that are not defined in the list of public fields', () => {
    return expect(
      secureTrim({
        merchant_name: 'Sliders',
        amount_in_cents: 12000,
        currency: 'DKK',
        id: '3e920f54-49df-4d0b-b11b-e6f08e3a2dca',
        user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
        date_created: '2021-09-21 20:57:40.021428',
        status: 'processed',
      })
    ).toEqual(
      JSON.stringify({
        merchant_name: 'Sliders',
        amount_in_cents: 12000,
        currency: 'DKK',
        date_created: '2021-09-21 20:57:40.021428',
        status: 'processed',
      })
    );
  });
});

describe('[Packages | Expense-domain | Formatter] format', () => {
  test('format should return an instance of expense that fits the API model, based on the db raw value', () => {
    return expect(
      format({
        merchant_name: 'sliders',
        amount_in_cents: 12000,
        currency: 'DKK',
        id: '3e920f54-49df-4d0b-b11b-e6f08e3a2dca',
        user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
        date_created: '2021-09-21 20:57:40.021428',
        status: 'processed',
      })
    ).toEqual({
      merchant_name: 'Sliders',
      amount_in_cents: 12000,
      currency: 'DKK',
      id: '3e920f54-49df-4d0b-b11b-e6f08e3a2dca',
      user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
      date_created: '2021-09-21 20:57:40.021428',
      status: 'processed',
    });
  });
});
