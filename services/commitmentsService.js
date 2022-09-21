let commitments = require("../models/commitments.js")
let mongoose = require("mongoose")
const commitmentsFactory = require("../factories/commitmentsFactory.js")


const Coms = mongoose.model("Commitments", commitments)

class CommitmentsService{
    async createCommitments(title, email, description, date, time){

        if(!title || !email || !description || !date || !time) alert("Preencha todos os campos!")
        let newComs = new Coms({
            title,
            email,
            description,
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
        if(showFinished) return await Coms.find()
        else{
            let comms = await Coms.find({'finished': false})
            let commitments = []

            comms.forEach(commitment => {
                commitments.push(commitmentsFactory.Build(commitment))
            })

            return commitments
        }
    }

    async getById(id){
        try{
            let event = await Coms.findOne({'_id': id})
            return event
        }catch(error){
            console.log(error)
        }
    }

    async finishComm(id){
        try{
            await Coms.findByIdAndUpdate(id, {finished: true})
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }

    async searchComms(){
        console.log(await Coms.find())
    }
}

module.exports = new CommitmentsService()