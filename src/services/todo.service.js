const moment = require('moment-timezone');
const { v4: uuidv4 } = require('uuid');
const { Todo } = require('./../models');
const paginationOptionGenerator = require('./../utils/pagination-option-generator');
const GenericError = require('../utils/generic-error');
/**
 * Get all todos from database.
 */
async function listTodos({ pagination, AUTH }) {
  const options = paginationOptionGenerator({
    where: {
      user_id: AUTH.user_id,
      status: true,
    },
    pagination,
    likeColumns: ['uuid:todo_id', 'uuid:user_id'],
  });

  const count = await Todo.count({
    ...options,
  });

  const data = await Todo.findAll({
    ...options,
  });

  return {
    status: true,
    count: count,
    data: data,
  };
}

/**
 * Create todo.
 */
async function createTodo({ body, AUTH }) {
  const { title } = body || {};
  const now = moment.utc().toISOString();
  const createTodo = await Todo.create({
    todo_id: uuidv4(),
    user_id: AUTH.user_id,
    title: title,
    is_completed: 0,
    status: 1,
    created_at: now,
    updated_at: now,
  });
  if (createTodo) {
    return {
      status: true,
      data: createTodo,
    };
  }
}

/**
 * Mark todo as completed.
 */
async function markTodoCompleted({ params, AUTH }) {
  const { todo_id } = params || {};
  const unCompletedTodoCount = await Todo.count({
    where: {
      todo_id: todo_id,
      user_id: AUTH.user_id,
      is_completed: 0,
    },
  });
  if (!unCompletedTodoCount) {
    throw new GenericError(400, 'Todo is not exists', unCompletedTodoCount);
  }
  const now = moment.utc().toISOString();
  const [markTodoCompleted] = await Todo.update(
    {
      is_completed: 1,
      updated_at: now,
    },
    {
      where: {
        todo_id: todo_id,
        user_id: AUTH.user_id,
      },
    }
  );
  return {
    status: true,
    data: markTodoCompleted,
  };
}

/**
 * Mark todo as uncompleted.
 */
async function markTodoUncompleted({ params, AUTH }) {
  const { todo_id } = params || {};
  const completedTodoCount = await Todo.count({
    where: {
      todo_id: todo_id,
      user_id: AUTH.user_id,
      is_completed: 1,
    },
  });
  if (!completedTodoCount) {
    throw new GenericError(400, 'Todo is not exists', completedTodoCount);
  }
  const now = moment.utc().toISOString();
  const [markTodoUncompleted] = await Todo.update(
    {
      is_completed: 0,
      updated_at: now,
    },
    {
      where: {
        todo_id: todo_id,
        user_id: AUTH.user_id,
      },
    }
  );
  return {
    status: true,
    data: markTodoUncompleted,
  };
}

/**
 * Delete todo.
 */
async function deleteTodo({ params, AUTH }) {
  const { todo_id } = params || {};
  const foundTodoCount = await Todo.count({
    where: {
      todo_id: todo_id,
      user_id: AUTH.user_id,
    },
  });
  if (!foundTodoCount) {
    throw new GenericError(400, 'Todo is not exists', foundTodoCount);
  }
  const now = moment.utc().toISOString();
  const [deleteTodo] = await Todo.update(
    {
      status: 0,
      deleted_at: now,
    },
    {
      where: {
        todo_id: todo_id,
        user_id: AUTH.user_id,
      },
    }
  );
  return {
    status: true,
    data: deleteTodo,
  };
}

module.exports = {
  listTodos,
  createTodo,
  markTodoCompleted,
  markTodoUncompleted,
  deleteTodo,
};
