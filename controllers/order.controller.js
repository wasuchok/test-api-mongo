const Order = require('../models/Order')

exports.listOrders = async (req, res) => {
    try {
        const order = await Order.find().populate('user').exec()
        res.status(200).json({
            message: 'สำเร็จ',
            data: order
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.readOrder = async (req, res) => {
    try {
        const order = await Order.find({ user: req.params.id });
        res.json({
            message: 'สำเร็จ',
            data: order
        });
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.purchase = async (req, res) => {
    try {
        const { id, product_name, price } = req.body;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'ไม่พบผู้ใช้งาน' });

        let totalPrice = price;

        if (user.rate_discount > 0) {
            const discountAmount = price * (user.rate_discount / 100);
            totalPrice = price - discountAmount;
            user.rate_discount = 0;
            await user.save();
        }

        if (user.wallet < totalPrice) return res.status(400).json({ error: 'ยอดเงินไม่พอที่จะสั่งซื้อ' });

        user.wallet -= totalPrice;
        await user.save();

        const order = new Order({ user: id, product_name, price, total_price: totalPrice });
        await order.save();

        res.json({
            message: 'สำเร็จ',
            data: order
        });
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}