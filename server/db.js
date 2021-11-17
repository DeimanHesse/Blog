const Pool = require('pg').Pool;

//так как pool - это класс, создаём новый экземплр класса,
//в котором указываем настройки дл подключени к постгресс
const  pool = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port:5432,
    database: 'postgres'

})

module.exports = pool;

//парол postgresBlog
//ползовател postgresBlog
// им азы postgresBlog