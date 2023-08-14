const express = require('express');
const router = express.Router();


const stripe = require('stripe')('sk_test_51NdIKuSJbYje4Wc4z3fVV6e7DrVaMz8KvCmQC4KugqrrbCpBFn2bPdvSqEWduGG7lQOllxgZORoMOUG8PfSlWP9U00RhZsoi0p');

router.post('/', async (req, res) => {
    const { paymentMethodId, totalAmount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'inr',
            payment_method: paymentMethodId,
            confirm: true,
        });

        if (paymentIntent.status === 'succeeded') {
            // Payment successful
            res.json({ success: true });
        }
        else {
            // Payment failed
            res.json({ success: false, error: 'Payment failed' });
        }
    }
    catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

module.exports = router;
