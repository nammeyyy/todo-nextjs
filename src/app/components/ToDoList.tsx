import { useState } from "react";
import { Todo } from "@/types";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";


interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
}

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
}: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSave = (id: string) => {
    if (editText.trim()) {
      editTodo(id, editText);
    }
    setEditingId(null);
  };

  if (todos.length === 0) {
    return <div className="p-5 text-center text-gray-500">ไม่มีรายการที่ต้องทำ</div>;
  }

  return (
    <ul className="max-h-80 overflow-y-auto">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
            todo.completed ? "bg-gray-50" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="w-5 h-5 mr-4 cursor-pointer"
          />

          {editingId === todo.id ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => handleSave(todo.id)}
              onKeyDown={(e) => e.key === "Enter" && handleSave(todo.id)}
              className="flex-1 border border-gray-300 px-2 py-1 rounded"
              autoFocus
            />
          ) : (
            <span
              className={`flex-1 text-base ${todo.completed ? "line-through text-gray-500" : ""}`}
            >
              {todo.text}
            </span>
          )}

          <button
            onClick={() => handleEdit(todo.id, todo.text)}
            className="text-gray-500 hover:text-gray-700 px-2"
          >
            <PencilSquareIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-xl text-red-500 opacity-60 hover:opacity-100 transition-opacity px-2"
            aria-label="Delete"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </li>
      ))}
    </ul>
  );
}
