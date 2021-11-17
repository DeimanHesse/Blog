const  db = require('../db');
const path = require('path');
const uuid = require('uuid');

const fs = require("fs");

class PostController {
    async createPost (req, res) {
        const {title, content, userId, author, theme, post_date} = req.body;
         const {img} = req.files;
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        const newPost = await db.query(`INSERT INTO post (title, content, user_id, img, author, theme, post_date) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [title, content, userId, fileName, author, theme, post_date]);
        // console.log(name, surname);
        res.json(newPost.rows[0]);
    }
    async getPostsByUser (req, res) {
        const id = req.query.id; //айди получаем из азы, не
        const posts = await db.query(`SELECT * FROM post where user_id = $1`, [id]);
        res.json(posts.rows[0]);
    }
    async getPosts (req, res) {
        const posts = await db.query(`SELECT * FROM post`);
        res.json(posts.rows);
    }
    async updatePost (req, res) {
        const {id, title, content, oldImg, theme} = req.body;
        let post;
        
        console.log(oldImg);
        
        if (req.files) {
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            fs.unlinkSync(path.resolve(__dirname, '..', 'static', oldImg));
            // fs.unlinkSync(`E:/preparation/first/Blog/server/static/${oldImg}`);
            post = await db.query('UPDATE post set title = $1, content = $2, img = $3, theme = $4 where id = $5 RETURNING*', [title, content, fileName, theme, id]);
        } else {
            post = await db.query('UPDATE post set title = $1, content = $2, img = $3, theme = $4 where id = $5 RETURNING*', [title, content, oldImg, theme, id]);
            console.log(post.rows[0]);
        }
        
       

        res.json(post.rows[0]);
    }
    async deletePost (req, res) {
        const id = req.params.id;

        const post = await db.query(`DELETE FROM post where id = $1`, [id])
        console.log(id);
       

        res.json(post.rows[0]);
    }
    async getPost (req, res) {
        const id = req.params.id;

        const post = await db.query(`SELECT * FROM post where id = $1`, [id])
        console.log(post.rows[0]);
        console.log('Айди',id);
        res.json(post.rows[0]);
    }
}

module.exports = new PostController();