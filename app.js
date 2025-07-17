const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: 1,
    username: "Aditi",
    content: "Happy Coding!"
  },
  {
    id: 2,
    username: "Sandeep",
    content: "hard work paves the road for success"
  },
  {
    id: 3,
    username: "rahulkumar",
    content: "Got selected for my 1st internship today!"
  }
];

// Home page
app.get("/", (req, res) => {
  res.redirect("/posts");
});

// Index route
app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

// New form
app.get("/posts/new", (req, res) => {
  res.render("new");
});

// Create post
app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  posts.push({ id: Date.now(), username, content });
  res.redirect("/posts");
});

// Show
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id == id);
  res.render("show", { post });
});

// Edit form
app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id == id);
  res.render("edit", { post });
});

// Update post
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const post = posts.find(p => p.id == id);
  post.content = content;
  res.redirect("/posts");
});

// Delete post
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter(p => p.id != id);
  res.redirect("/posts");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
