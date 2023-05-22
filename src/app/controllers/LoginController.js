const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Đăng nhập
class LoginController {
    loginScreen(req, res) {
        const errorMessage = req.flash('error')[0];
        res.render('login/login', { errorMessage });
    }


    // Đăng nhập
    loginCheck = async (req, res) => {
        const { username, password } = req.body;
        console.log(password);

        try {
            // Tìm người dùng trong cơ sở dữ liệu
            const user = await User.findOne({ username });

            // Kiểm tra người dùng tồn tại
            if (!user) {
                req.flash('error', 'Tài khoản không tồn tại.');
                return res.redirect('/login/login-screen');
            }

            // Kiểm tra mật khẩu
            console.log(user.password);
            const isMatch = await bcrypt.compare(password, user.password);


            if (!isMatch) {
                req.flash('error', 'Mật khẩu không chính xác.');
                return res.redirect('/login/login-screen');
            }

            // Đăng nhập thành công, trả về thông tin người dùng và vai trò
            req.session.user = user; // Lưu thông tin người dùng vào session
            return res.redirect('/'); // Chuyển hướng đến trang chủ
        } catch (error) {
            console.error(error);
            req.flash('error', 'Đã xảy ra lỗi trong quá trình đăng nhập.');
            res.redirect('/login/login-screen');
        }
    };

    registerScreen(req, res) {
        const errorMessage = req.flash('error')[0];
        res.render('login/register', { errorMessage });
    }

    registerUser = async (req, res) => {
        const { username, password, fullname } = req.body;

        try {
            // Kiểm tra xem người dùng đã tồn tại hay chưa
            const existingUser = await User.findOne({ username });

            if (existingUser) {
                return res.status(400).json({ message: 'Tài khoản đã tồn tại.' });
            }

            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo một người dùng mới
            const newUser = new User({
                username,
                password: hashedPassword,
                fullname,
            });

            // Lưu người dùng vào cơ sở dữ liệu
            await newUser.save();

            // Đăng kí thành công
            res.status(201).json({ message: 'Đăng kí thành công.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đăng kí.' });
        }
    };

}

module.exports = new LoginController;