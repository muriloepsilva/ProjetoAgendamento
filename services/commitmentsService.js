let commitments = require("../models/commitments.js")
let mongoose = require("mongoose")

const Coms = mongoose.model("Commitments", commitments)

class CommitmentsService{
    async create(name, email, description, cpf, date, time){
        let newComs = new Coms({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false
        })

        try{
            await newComs.save()
            return true
        }catch(err){
            console.log(err)
            return false
        }
        
    }
}

module.exports = new CommitmentsService()