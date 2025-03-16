import express, { response } from "express";
import { db, connectToDb } from "./db.js";
import cors from 'cors';
const app = express();
app.use(express.json(), cors());

// app.post("/hello", (req, res) => {
//     res.send(`Hello ${req.body.name}!`)
// })

// app.get("/hello/:firstName/:lastName", (req, res) => {
//     const { firstName, lastName } = req.params
//     console.log(`Hello ${firstName} ${lastName}!`);
//     res.send(`Hello ${firstName} ${lastName}!`)
// })

// app.get("/hello/:name", (req, res) => {
//     const { name } = req.params
//     console.log(`Hello ${name}!`);
//     res.send(`Hello ${name}!`)
// })




app.get("/api/articles/:name", async (req, res) => {
	const { name } = req.params
	const article = await db.collection('articles').findOne({ name })
	if (article) {
		console.log(article);
		res.json(article);
	} else {
		res.sendStatus(404).send('Article not found');
	}

})

app.put("/api/articles/:name/upvote", async (req, res) => {
	const { name } = req.params;
	await db.collection('articles').updateOne({ name }, {
		$inc: {
			upvotes: 1
		}
	})
	const article = await db.collection('articles').findOne({ name })
	if (article) {
		console.log(article);
		res.json(article);
	} else {
		res.send(`The article ${name} doesn't exist`);
	}
});

app.post("/api/articles/:name/comments", async (req, res) => {
	const { name } = req.params;
	const { postedBy, comment } = req.body;
	await db.collection('articles').updateOne({ name }, {
		$push: {
			comments: { postedBy, comment }
		}
	})
	const article = await db.collection('articles').findOne({ name })
	if (article) {
		res.json(article);
	} else {
		res.send(`The article ${name} doesn't exist`);
	}
});


connectToDb(() => {
	console.log("Connected to database!");
	app.listen(8000, () => {
		console.log("Server is listening on port 8000");
	});
})
