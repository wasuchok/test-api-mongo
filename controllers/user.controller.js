const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.listUsers = async (req, res) => {
    try {
        const user = await User.find().select("-password").exec()
        res.status(200).json({
            message: 'สำเร็จ',
            data: user
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.createUser = async (req, res) => {
    try {
        const { username, email, password, tel } = req.body
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({
                message: 'อีเมลนี้ถูกใช้งานแล้ว'
            })
        }

        const user = new User({
            username,
            password: hash,
            email,
            tel
        })

        await user.save()

        res.status(201).json({
            message: 'สำเร็จ',
        })

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.readUser = async (req, res) => {
    try {
        const user = await User.findOne({ "email": req.params.email }).select("-password").exec()
        res.status(200).json({
            message: 'สำเร็จ',
            data: user
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { username, email, password, tel, newPassword } = req.body

        const findUser = await User.findOne({ email })

        if (!findUser) {
            return res.status(400).json({
                message: 'ไม่พบผู้ใช้งาน'
            })
        }

        const isPassword = await bcrypt.compare(password, findUser.password)

        if (!isPassword) {
            return res.status(400).json({
                message: 'รหัสผ่านไม่ถูกต้อง'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)
        const user = await User.findOneAndUpdate({ "email": req.params.email }, { username, password: hash, tel }, { new: true }).select("-password").exec()
        res.status(200).json({
            message: 'สำเร็จ',
        })
    } catch (err) {
        consoe.log(err)
        res.status(500).send('Server Error')
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ "email": req.params.email }).exec()
        res.status(200).json({
            message: 'สำเร็จ',
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.topup = async (req, res) => {
    try {
        const { id, amount } = req.params

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'ไม่เจอผู้ใช้งาน' });

        user.wallet += Number(amount);
        await user.save();

        res.status(200).json({
            message: "สำเร็จ",
            wallet: user.wallet
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}