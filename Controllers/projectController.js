const projects = require('../Models/projectSchema');
const { findOne } = require('../Models/userSchema');

//1. add project logic
exports.addProject = async (req, res) => {
    console.log("Inside the addProject method");
    const { title, language, github, livelink, overview } = req.body
    const projectImage = req.file.filename
    const userId = req.payload
    console.log(title, language, github, livelink, overview, projectImage);
    console.log(userId);
    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(401).json("Project Already added")
        }
        else {
            const newProject = new projects({
                title,
                language,
                github,
                livelink,
                overview,
                projectImage,
                userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch (err) {
        res.status(404).json("Adding Project Failed....", err)
    }
}

// 2. View a particular user projects
exports.getAProject = async (req, res) => {
    console.log("Inside get a Project");
    const userId = req.payload
    console.log(userId);
    try {
        const projectDetails = await projects.find({ userId })
        if (projectDetails) {
            // console.log(projectDetails);
            res.status(200).json(projectDetails)
            // console.log("got data");
        }
        else {
            res.status(401).json("No such user")
        }
    }
    catch (err) {
        res.status(404).json("Error :", err)
    }
}

// 3. Get 3 projects details for Home Project
exports.getHomeProjects = async (req, res) => {
    try {
        const homeProjects = await projects.find().limit(3)
        if (homeProjects) {
            res.status(200).json(homeProjects)
        }
        else {
            res.status(401).json("Getting projects failed")
        }
    }
    catch (err) {
        res.status(404).json("Error:" + err)
    }
}

// 4. Get all peojects details
exports.getAllProjects = async (req, res) => {

    const searchKey = req.query.search
    console.log(searchKey);

    let query ={}

    //case sensitive and searching
    if(searchKey){
        query.language = {$regex:searchKey,$options:"i"}
    }    

    console.log("Inside get All Projects");
    try {
        const allProjects = await projects.find(query)
        if (allProjects) {
            res.status(200).json(allProjects)
        }
        else {
            res.status(401).json("Getting project failed")
        }
    }
    catch (err) {
        res.status(404).json("Error:", err)
    }
}

// 5. Delete user project
exports.deleteUserProject = async(req,res)=>{
    console.log("Inside delete");
    const {pid} = req.params
    try{
        const deletepro= await projects.findOneAndDelete({_id:pid})
        res.status(200).json(deletepro)
    }
    catch(err){
        res.status(404).json("Error:"+err)
    }
}

// 6. update user project
exports.updateUserProject = async(req,res)=>{
    const {title,language,github,livelink,overview,projectImage} = req.body
    const userId = req.payload
    const {pid} = req.params
    const uploadImage = req.file?req.file.filename:projectImage
    try{
        //FIND PARTICULAR PROJECT AND UPDATE
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{title,language,github,livelink,overview,projectImage:uploadImage,userId})
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}