const db = require('./config/db');

// Функция для сделать пользователя администратором по email
async function makeUserAdmin(email) {
  try {
    // Проверяем существует ли пользователь
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (userCheck.rows.length === 0) {
      console.error(`Пользователь с email ${email} не найден`);
      process.exit(1);
    }
    
    // Обновляем роль пользователя на admin
    const result = await db.query(
      'UPDATE users SET role = $1 WHERE email = $2 RETURNING id, nickname, email, role',
      ['admin', email]
    );
    
    console.log('Пользователь успешно обновлен:');
    console.log(result.rows[0]);
    
    // Закрываем соединение с базой данных
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
    process.exit(1);
  }
}

// Проверяем, что email был передан как аргумент
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Пожалуйста, укажите email пользователя');
  console.error('Пример: node make-admin.js user@example.com');
  process.exit(1);
}

// Вызываем функцию
makeUserAdmin(args[0]); 