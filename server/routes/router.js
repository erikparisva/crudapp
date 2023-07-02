const express = require('express');
const route = express.Router()

const services = require('../services/render')
const controller = require('../controller/controller')

/* root route */
route.get('/', services.homeRoutes);

/* add task route */
route.get('/add-task', services.add_task);

/* edit task route */
route.get('/edit-task', services.edit_task);

//API
route.post('/api/tasks',controller.create);
route.get('/api/tasks',controller.find);
route.put('/api/tasks/:id',controller.update);
route.delete('/api/tasks/:id',controller.delete);

module.exports = route