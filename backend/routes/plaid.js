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

        const accountsResponse = await client.accountsBalanceGet({
            access_token: accessToken,
        });
        const accounts = accountsResponse.data.accounts;

        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const formatDate = (date) => date.toISOString().split('T')[0];

        const transactionsResponse = await client.transactionsGet({
            access_token: accessToken,
            start_date: formatDate(thirtyDaysAgo),
            end_date: formatDate(today),
            options: { count: 10 }
        });
        const transactions = transactionsResponse.data.transactions;

        let assets = 0;
        let liabilities = 0;

        accounts.forEach(acc => {
            const balance = acc.balances.current;
            if (acc.type === 'credit' || acc.type === 'loan') {
                liabilities += balance;
            } else {
                assets += balance;
            }
        });

        const netWorth = assets - liabilities;

        const formatMoney = (amount) => {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
        };

        res.json({
            access_token: accessToken,
            item_id: itemId,
            accounts: accounts,
            transactions: transactions.map(t => ({
                id: t.transaction_id,
                date: t.date,
                merchant: t.merchant_name || t.name,
                amount: t.amount,
                category: t.category ? t.category[0] : 'Uncategorized'
            })),
            financialData: {
                netWorth: formatMoney(netWorth),
                assets: formatMoney(assets),
                liabilities: formatMoney(liabilities),
                rawNetWorth: netWorth
            }
        });
    } catch (error) {
        console.error('Error exchanging public token:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
