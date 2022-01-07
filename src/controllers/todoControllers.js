const asyncHandler = require('express-async-handler');
const { Todo, User } = require('../sequelize');
const cache = require('../middleware/cacheMiddleware');

exports.createTodo = asyncHandler(async (req, res, next) => {
    const todo = await Todo.create({
        ...req.body,
        userId: req.user.id,
    });

    res.status(200).json({ success: true, data: todo });
});

exports.getAllTodo = asyncHandler(async (req, res, next) => {
    const cachedKey = 'todos';
    const cachedData = await cache.get(cachedKey);

    if (cachedData) {
        return res.status(200).json({ success: true, data: cachedData });
    }

    const todos = await Todo.findAll({
        attributes: [
            "id",
            "task",
            "description",
        ],
    });
    await cache.save(cachedKey, todos, 300);

    return res.status(200).json({ success: true, data: todos });
});

exports.getTodoById = asyncHandler(async (req, res, next) => {
    const todo = await Todo.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ["id", "username", "email"],
            },
        ],
    });

    if (!todo) {
        return next({
            message: `No todo found for ID - ${req.params.id}`,
            statusCode: 404,
        });
    }

    res.status(200).json({ success: true, data: todo });
});

exports.updateTodo = asyncHandler(async (req, res, next) => {
    await Todo.update(req.body, {
        where: { id: req.params.id },
    });

    const todo = await Todo.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ["id", "username", "email"],
            },
        ],
    });

    res.status(200).json({ success: true, data: todo });
});

exports.removeTodo = asyncHandler(async (req, res, next) => {
    await Todo.destroy({
        where: { id: req.params.id },
    });

    res.status(200).json({ success: true, data: {} });
});