var taskdb = require('../model/model');

// create and save new task(s)
exports.create = (req,res) => {
    if(!req.body.name){
        res.status(400).send({message:"Field cannot be empty!"})
        return;
    }

    //new task
    const task = new taskdb({
        name: req.body.name,
        priority: req.body.priority,
        label: req.body.label
    })

    // save taks in database
    task
        .save(task)
        .then(data => {
            //res.send(data)
            res.redirect('/add-task')
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message||"An error occured with the create operation!"
            });
        });

}

// retrieve and return task(s)
exports.find = (req,res) => {
    if(req.query.id){
        const id = req.query.id;

        taskdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Task with id " + id + " has not been found!"})
            }else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "An error occured retrieving task with id " + id})
        })
    }else{
      taskdb.find()
        .then(task =>{
      res.send(task)
        })
        .catch(err=>{
            res.status(500).send({message:err.message||"An error occured with information retrieval!"})
        })
    }
    
}

// update task(s)
exports.update = (req,res) => {
    if(!req.body){
        return res
         .status(400)
         .send({message:"Data cannot be empty!"})
    }
    const id = req.params.id;
    taskdb.findByIdAndUpdate(id, req.body)
    .then(data => {
        if(!data){
            res.status(404).send({message: `Cannot update task with ${id}`})
        } else {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message:"An error occured updating task information!"})
    })
}

//delete tasks(s)
exports.delete = (req,res) => {
    const id = req.params.id;

    taskdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message:`Cannot delete task with id ${id}!`})
            } else {
                res.send({
                    message: "Task was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete task with id " + id
            });
        });
}