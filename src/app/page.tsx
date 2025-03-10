'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo, FilterType } from '../types';
import TodoForm from './components/ToDoForm';
import TodoFilter from './components/ToDoFilter';
import TodoList from './components/ToDoList';
import TodoFooter from './components/ToDoFooter';
import Sidebar from './components/SideBar';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    filterTodos(searchQuery, currentFilter);
  }, [todos, searchQuery, currentFilter]);

  const changeFilter = (filter: FilterType) => {
    setCurrentFilter(filter);
    filterTodos(searchQuery, filter);
  };

  const filterTodos = (query: string, filter: FilterType) => {
    let updatedTodos = todos;
    
    if (filter === "active") {
      updatedTodos = todos.filter(todo => !todo.completed);
    } else if (filter === "completed") {
      updatedTodos = todos.filter(todo => todo.completed);
    }

    if (query) {
      updatedTodos = updatedTodos.filter(todo => todo.text.toLowerCase().includes(query.toLowerCase()));
    }

    setFilteredTodos(updatedTodos);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <main className="bg-gray-100 min-h-screen flex">
      <Sidebar onSearch={setSearchQuery} />
      <div className="flex-1 p-6 flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-yellow-400 p-6 text-center text-white rounded-t-xl">
            <h1 className="text-3xl font-bold font-comfortaa">ToDo List</h1>
          </div>

          <div className="p-6">
            <TodoForm addTodo={(text) => setTodos([...todos, { id: uuidv4(), text, completed: false }])} />
            <TodoFilter 
              currentFilter={currentFilter} 
              changeFilter={changeFilter} 
              clearCompleted={clearCompleted} 
            />
            <TodoList 
              todos={filteredTodos} 
              toggleTodo={(id) => setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))}
              deleteTodo={(id) => setTodos(todos.filter(todo => todo.id !== id))}
              editTodo={(id, newText) => setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo))}
            />
            <TodoFooter activeTodoCount={filteredTodos.filter(todo => !todo.completed).length} />
          </div>
        </div>
      </div>
    </main>
  );
}
