import express from "express";
let articlesInfo = [
	{
		name: "learn-react",
		upvotes: 0,
		comments: [],
	},
	{
		name: "learn-node",
		upvotes: 0,
		comments: [],
	},
	{
		name: "mongodb",
		upvotes: 0,
		comments: [],
	},
];
const app = express();
app.use(express.json());

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

app.put("/api/articles/:name/upvote", (req, res) => {
	const articleName = req.params.name;
	const article = articlesInfo.find(
		(article) => article.name === articleName
	);
	if (article) {
		article.upvotes += 1;
		res.send(
			`The ${articleName} article now has ${article.upvotes} upvotes`
		);
	} else {
		res.send(`The article ${articleName} doesn't exist`);
	}
});

app.post("/api/articles/:name/comments", (req, res) => {
	const articleName = req.params.name;
	const { postedBy, comment } = req.body;

	const article = articlesInfo.find(
		(article) => article.name === articleName
	);
	if (article) {
		article.comments.push({ postedBy, comment });
		res.send(article);
	} else {
		res.send(`The article ${articleName} doesn't exist`);
	}
	console.log(articlesInfo);
});

app.listen(8000, () => {
	console.log("Server is listening on port 8000");
});
