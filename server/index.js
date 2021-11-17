const express = require('express');

const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const cors = require('cors');



const fileUpload = require('express-fileupload');

const path = require('path');
//создаём порт
const PORT = process.env.PORT || 8080;

const app = express();

//делаем первую функцию, котора отвечает на определённые запросы
// app.get('/',(req, res) => {
//     res.send('fdferfefhello');
// })

app.use(cors());
app.use(express.json());
//нужно явно указать серверу, чтобы файлы из статики, он раздавал как статику
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));

app.use('/api', userRouter);
app.use('/api', postRouter);

//запускаем сервер
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
