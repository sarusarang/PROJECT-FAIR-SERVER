const projects = require('../Models/ProjectModel')
// Add Projects
exports.addprojects = async (req, res) => {

    const userId = req.payload

    const { title, overview, language, github, demo } = req.body

    const image = req.file.filename

    console.log(req.body);
    console.log(image);

    try {

        const existingproject = await projects.findOne({ github })

        if (existingproject) {

            res.status(406).json("project already added!!")
        }
        else {

            const newproject = new projects({

                title, overview, languages: language, github, demo, image, userId
            })

            newproject.save()

            res.status(200).json("success")
        }
    }

    catch (err) {

        console.log(err);
        res.status(406).json(err)
    }

}

exports.homeprojects = async (req, res) => {

    try {

        const result = await projects.find().limit(3)

        if (result) {

            res.status(200).json(result)

        }
        else {

            res.status(406).json("No projects found")
        }

    }
    catch (err) {

        console.log(err);
        res.status(406).json(err)
    }

}

exports.allprojects = async (req, res) => {


    try {

        const result = await projects.find()

        if (result) {

            res.status(200).json(result)

        }
        else {

            res.status(406).json("No projects found")
        }

    }
    catch (err) {

        console.log(err);
        res.status(406).json(err)
    }

}

exports.userprojects = async (req, res) => {

    try {

        const userId = req.payload

        const result = await projects.find({ userId })

        if (result) {

            res.status(200).json(result)

        }
        else {

            res.status(406).json("No projects found")
        }

    }
    catch (err) {

        console.log(err);
        res.status(406).json(err)
    }

}


exports.editProject = async (req, res) => {
    
    const { title, overview, language, github, demo, image } = req.body
    
    const userId = req.payload
    const projectImage = req.file ? req.file.filename : image
    const { pid } = req.params

    try {
        const updateProject = await projects.findByIdAndUpdate({ _id: pid }, { title, overview, languages: language, github, demo, image: projectImage, userId }, { new: true })
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch {
        console.log(err);
        res.status(406).json(err)
    }

}

exports.deleteprojects =async (req,res)=>{

    const {pid} =req.params

    try{

        const results = await projects.findByIdAndDelete({_id:pid}) 
        res.status(200).json(results)
        console.log("deleted");
    }
    catch(err){

        res.status(406).json(err)
    }

}