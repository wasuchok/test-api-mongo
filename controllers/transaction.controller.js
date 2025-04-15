const Transaction = require('../models/Transaction')

exports.listTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().exec()

        const balance = transactions.reduce((acc, t) => {
            return t.type === 'income' ? acc + t.amount : acc - t.amount;
        }, 0);
        res.status(200).json({
            message: 'สำเร็จ',
            data: {
                transactions,
                balance
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.createTransaction = async (req, res) => {
    try {
        const { name, amount, type } = req.body
        const transaction = await new Transaction({
            name,
            amount: Number(amount),
            type,
        }).save()

        res.status(200).json({
            message: 'สำเร็จ'
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}