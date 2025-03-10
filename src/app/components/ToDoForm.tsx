import { useState, FormEvent } from 'react';

interface TodoFormProps {
  addTodo: (text: string) => void;
}

export default function TodoForm({ addTodo }: TodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  };

  return (
    <div className="p-5 border-b border-gray-200">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          className="flex-1 py-3 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="เพิ่มรายการใหม่..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white py-3 px-5 rounded-r-lg hover:bg-purple-700 transition-colors font-medium"
        >
          เพิ่ม
        </button>
      </form>
    </div>
  );
}