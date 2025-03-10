import { FilterType } from "@/types";

interface Props {
  currentFilter: FilterType;
  changeFilter: (filter: FilterType) => void;
  clearCompleted: () => void;
}

export default function TodoFilter({ currentFilter, changeFilter, clearCompleted }: Props) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex space-x-2">
        <button
          className={`px-3 py-2 rounded-full text-sm ${
            currentFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => changeFilter('all')}
        >
          ทั้งหมด
        </button>
        <button
          className={`px-3 py-2 rounded-full text-sm ${
            currentFilter === 'active' ? 'bg-yellow-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => changeFilter('active')}
        >
          ยังไม่เสร็จ
        </button>
        <button
          className={`px-3 py-2 rounded-full text-sm ${
            currentFilter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => changeFilter('completed')}
        >
          เสร็จแล้ว
        </button>
      </div>

      <button
        className="px-3 py-2 rounded-full text-sm bg-red-500 text-white hover:bg-red-400 transition"
        onClick={clearCompleted}
      >
        ลบรายการที่เสร็จแล้ว
      </button>
    </div>
  );
}
