const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Đăng nhập
class LoginController {
    loginScreen(req, res) {
        res.render('layouts/login');
    }


    // Đăng nhập
    // loginCheck = async (req, res) => {
    //     const { username, password } = req.body;

    //     try {
    //         // Tìm người dùng trong cơ sở dữ liệu
    //         const user = await User.findOne({ username });

    //         // Kiểm tra người dùng tồn tại
    //         if (!user) {
    //             return res.status(404).json({ message: 'Tài khoản không tồn tại.' });
    //         }

    //         // Kiểm tra mật khẩu
    //         const isMatch = await bcrypt.compare(password, user.password);

    //         if (!isMatch) {
    //             return res.status(401).json({ message: 'Mật khẩu không chính xác.' });
    //         }

    //         // Đăng nhập thành công, trả về thông tin người dùng và vai trò
    //         res.status(200).json({ user, role: user.role });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đăng nhập.' });
    //     }
    // };

}

module.exports = new LoginController;