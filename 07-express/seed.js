require('dotenv').config();
const mongoose = require('./db_conn');
const bcrypt = require('bcrypt');
const UserModel = require('./models/userModel');
setTimeout(async () => {
  const hashedPwd = await bcrypt.hash('admin123', 10);
  await UserModel.create({ userName: 'Anshika', userEmail: 'admin@test.com', userPwd: hashedPwd, userRole: 'admin' });
  console.log('Admin user created');
  process.exit(0);
}, 1000);