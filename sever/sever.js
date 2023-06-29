const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

// 创建 SQLite 数据库连接
const db = new sqlite3.Database(':memory:');

// 创建用户表
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, role TEXT)');
});

// 处理登录请求
app.get('/login/:role', (req, res) => {
  const { role } = req.params;

  // 将用户信息存储到数据库
  db.serialize(() => {
    const stmt = db.prepare('INSERT INTO users (username, role) VALUES (?, ?)');
    stmt.run('user', role);
    stmt.finalize();
  });

  res.sendStatus(200);
});

// 处理登出请求
app.get('/logout', (req, res) => {
  // 清除用户表数据
  db.run('DELETE FROM users');

  res.sendStatus(200);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
