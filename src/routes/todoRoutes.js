const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createTodo,
    getAllTodo,
    getTodoById,
    updateTodo,
    removeTodo,
} = require('../controllers/todoControllers');

router.route('/')
    .get(getAllTodo)
    .post(protect, createTodo);

router.route('/:id')
    .get(getTodoById)
    .put(protect, updateTodo)
    .delete(protect, removeTodo)

module.exports = router;