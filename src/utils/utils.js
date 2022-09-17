module.exports.getPayMockResponse = async (data, type) => ({
    id: data.orderId,
    type,
    status: 'COMPLETED',
    amount: {
        total: data.amount,
        currency: data.currency,
    },
    seller_protection: {
        status: 'ELIGIBLE',
        dispute_categories: [
            'ITEM_NOT_RECEIVED',
            'UNAUTHORIZED_TRANSACTION',
        ],
    },
    supplementary_data: {
        related_ids: {
            order_id: '29U15271MB9916641',
        },
    },
    expiration_time: '2017-10-10T23:23:45Z',
    create_time: '2017-09-11T23:23:45Z',
    update_time: '2017-09-11T23:23:45Z',
    links: [
        {
            rel: 'self',
            method: 'GET',
            href: 'https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046',
        },
        {
            rel: 'capture',
            method: 'POST',
            href: 'https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046/capture',
        },
        {
            rel: 'void',
            method: 'POST',
            href: 'https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046/void',
        },
        {
            rel: 'reauthorize',
            method: 'POST',
            href: 'https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046/reauthorize',
        },
    ],
});

module.exports.getReimburseMockResponse = async (data, type) => ({
    id: data.orderId,
    status: 'COMPLETED',
    type,
    amount: {
        total: data.amount,
        currency: data.currency,
    },
    parent_transaction: {
        id: 'O-98V07748C3436772V',
        type: 'ORDER',
    },
    links: [
        {
            rel: 'self',
            method: 'GET',
            href: 'https://api-m.paypal.com/v2/payments/captures/2GG279541U471931P',
        },
        {
            rel: 'refund',
            method: 'POST',
            href: 'https://api-m.paypal.com/v2/payments/captures/2GG279541U471931P/refund',
        },
        {
            rel: 'up',
            method: 'GET',
            href: 'https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046',
        },
    ],
});
