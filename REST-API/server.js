import  express  from "express";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json())

// app.get('/', (req, res) => res.send("hello world"))

let students = [
    {id:1, name:"john", age:18},
    {id:2, name:"aaswfa", age:2008},
    {id:4, name:"pohn", age:218},
]

app.get('/api/students', (req, res)=>{
    res.send(students);
})

app.get('/api/students/:id', (req, res)=>{
    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('student not found')
    res.send(student)
})

app.post('/api/students', (req, res)=>{
    const student ={
        id: students.length+1,
        name: req.body.name,
        age: req.body.age
    }
    students.push(student)
    res.send(student)
})

app.delete('/api/students/:id', (req, res)=>{
    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('student not found')
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student)
})

app.listen(PORT, ()=>console.log(`server started on ${PORT}`));

