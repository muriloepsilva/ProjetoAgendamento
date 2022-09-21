const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const commitmentsService = require("./services/commitmentsService.js")

const PORT = process.env.PORT || 5000
const URL = process.env.DATABASE_URL

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/calendar', (req, res) => {
    res.render('calendar')
})

app.get("/cadastro", (req, res) => {
    res.render("create")
})

app.post("/create", async (req, res) => {
    if(!req.body.title || !req.body.email || !req.body.description || !req.body.date || !req.body.time) res.send("Preencha todos os campos")
    
    else{
        const status = await commitmentsService.createCommitments(
            req.body.title, 
            req.body.email,
            req.body.description,
            req.body.date,
            req.body.time
        )
        
        if(status){
            res.redirect("/calendar")
        }else{
            res.send("Ocorreu uma falha!")
    }
    }

    
})

app.get("/getCalendar", async (req, res) => {
    let commitments = await commitmentsService.getAllCommitments(false)
    res.json(commitments)
})

app.get('/event/:id', async (req, res) => {
    let commitment = await commitmentsService.getById(req.params.id)
    res.render("event", {comm: commitment})
})

app.post('/finish', async (req, res) => {
    let id = req.body.id
    let result = await commitmentsService.finishComm(id)

    res.redirect("/calendar")
})

// app.get("/list", async (req, res) => {
//     await commitmentsService.searchComms()
//     const comms = await commitmentsService.getAllCommitments(true)
//     res.render("list", {comms})
// })

app.listen(PORT, () => {console.log(`SERVIDOR RODANDO NA PORTA: ${PORT}!`)})