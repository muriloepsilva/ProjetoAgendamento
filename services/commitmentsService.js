let commitments = require("../models/commitments.js")
let mongoose = require("mongoose")

const coms = mongoose.model("Commitments", commitments)

class CommitmentsService{
    async createCommitments(name, email, description, cpf, date, time){
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

    async getAllCommitments(showFinished){
        if(showFinished) return await coms.find()
        else return await coms.find({'finished': false})
    }
}

module.exports = new CommitmentsService()