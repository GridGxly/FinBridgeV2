import express from 'express';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const router = express.Router();

const configuration = new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
        },
    },
});

const client = new PlaidApi(configuration);


router.post('/create_link_token', async (req, res) => {
    try {
        const { userId } = req.body;

        const request = {
            user: {
                client_user_id: userId || 'user_good',
            },
            client_name: 'Finbridge',
            products: ['auth', 'transactions'],
            language: 'en',
            country_codes: ['US'],
        };

        const response = await client.linkTokenCreate(request);
        res.json(response.data);
    } catch (error) {
        console.error('Error creating link token:', error);
        res.status(500).json({ error: error.message });
    }
});


router.post('/exchange_public_token', async (req, res) => {
    const { public_token } = req.body;
    try {
        const response = await client.itemPublicTokenExchange({
            public_token: public_token,
        });
        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;



        res.json({ access_token: accessToken, item_id: itemId });
    } catch (error) {
        console.error('Error exchanging public token:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
