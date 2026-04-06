const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

// Kết nối MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/loginDB')
  .then(() => console.log('Đã kết nối Database!'))
  .catch(err => console.error('Lỗi DB:', err));

const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
}));

// Xử lý Đăng ký
app.post('/register', async (req, res) => {
  try {
    await new User({ username: req.body.username, password: req.body.password }).save();
    res.send('Đăng ký thành công! <a href="/">Quay lại đăng nhập</a>');
  } catch (error) { res.send('Lỗi đăng ký!'); }
});

// Xử lý Đăng nhập
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username, password: req.body.password });
  if (user) res.send(`Chào mừng ${user.username}!`);
  else res.send('Sai tài khoản hoặc mật khẩu.');
});

app.listen(3000, () => console.log('Web đang chạy ở cổng 3000'));