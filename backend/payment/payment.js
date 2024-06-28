const axios = require("axios");
const nock = require("nock");
/* -------------------------------------------------------------------------- */
/*                            Paypal Payment Mock Integration                 */
/* -------------------------------------------------------------------------- */
nock("https://api.paypal.com")
  .post("/v1/payments/payment")
  .reply(200, {
    id: "payment_id_ref123mfe4589",
    state: "approved",
    transactions: [
      {
        amount: {
          total: "100",
          currency: "USD",
        },
        description: "Mock payment for order",
      },
    ],
  });

const processPaypalPayment = async (amount, description) => {
  const response = await axios.post(
    "https://api.paypal.com/v1/payments/payment",
    {
      transactions: [
        {
          amount: {
            total: (amount / 100).toFixed(2),
            currency: "USD",
          },
          description,
        },
      ],
    }
  );
  return response.data;
};

module.exports = {processPaypalPayment};
