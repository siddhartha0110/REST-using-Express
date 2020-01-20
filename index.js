const express = require("express");
const app = express();
const Joi = require("joi");
app.use(express.json());

const courses = [
  { id: 1, name: "Maths" },
  { id: 2, name: "Java" },
  { id: 3, name: "Python" }
];

app.get("/", (req, res) => {
  res.send("Welcome to my express app");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Course Not Found");
    return;
  }
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body); //result.error
  if (error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const newCourse = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(newCourse);
  res.send(newCourse);
});

app.put("/api/courses/:id", (req, res) => {
  //Check if Course Exists
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Course Not Found");
    return;
  }
  //If Exists,Validate New Input
  const { error } = validateCourse(req.body); //result.error
  if (error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  //If Validated, update Course
  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Course Not Found");
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
