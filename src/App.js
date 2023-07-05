import React, { useState } from 'react';
import './TodoApp.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('asc');
  const [selectAll, setSelectAll] = useState(false);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { task: newTodo, completed: false, show: true }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].show = false;
    setTodos(updatedTodos);
  };

  const updateTodo = (index, updatedTask) => {
    const updatedTodos = [...todos];
    updatedTodos[index].task = updatedTask;
    setTodos(updatedTodos);
  };

  const toggleCompleted = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleCheckboxClick = (event) => {
    const checked = event.target.checked;
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: checked,
    }));
    setTodos(updatedTodos);
    setSelectAll(checked);
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === 'asc') {
      return a.task.localeCompare(b.task);
    } else {
      return b.task.localeCompare(a.task);
    }
  });

  const filteredTodos = sortedTodos.filter((todo) =>
    todo.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="todoapp">
      <div className="todo-app-container">
        <h1>Todo App</h1>
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new todo"
          />
          <button onClick={addTodo}>Add Todo</button>
        </div>

        <div className="search-sort">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
          />
          <label>
            Sort by:
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>

        <ul className="todo-list">
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              className={`todo-item ${todo.completed ? 'completed' : ''} ${
                todo.show ? 'show' : 'hide'
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(index)}
              />
              <input
                type="text"
                value={todo.task}
                onChange={(e) => updateTodo(index, e.target.value)}
              />
              <button onClick={() => deleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>

        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleCheckboxClick}
          />
          <span>Select All</span>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
