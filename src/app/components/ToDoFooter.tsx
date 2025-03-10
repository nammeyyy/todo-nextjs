interface TodoFooterProps {
    activeTodoCount: number;
  }
  
  export default function TodoFooter({ activeTodoCount }: TodoFooterProps) {
    return (
      <div className="p-4 text-center text-gray-500 bg-gray-100 text-sm">
        <p>
          คงเหลือ {activeTodoCount} รายการที่ยังไม่เสร็จ
        </p>
      </div>
    );
  }