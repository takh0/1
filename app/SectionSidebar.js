import { useEffect, useState } from 'react';
import { GripVertical, CheckSquare, Square } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const defaultSections = [
  { id: 'info', label: '👰 예식 정보', enabled: true },
  { id: 'message', label: '💌 초대 메시지', enabled: true },
  { id: 'account', label: '🏦 계좌 정보', enabled: true },
  { id: 'photo', label: '📸 커플 사진', enabled: true },
  { id: 'preview', label: '📱 미리보기', enabled: true },
];

function SortableItem({ item, listeners, attributes, isDragging, transform, transition, toggle }) {
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div className="flex items-center justify-between bg-white p-3 border rounded-xl shadow-sm mb-2" style={style} {...attributes} {...listeners}>
      <div className="flex items-center space-x-2">
        <GripVertical className="text-gray-500 cursor-grab" />
        <span>{item.label}</span>
      </div>
      <button onClick={() => toggle(item.id)}>
        {item.enabled ? <CheckSquare className="text-green-500" /> : <Square className="text-gray-400" />}
      </button>
    </div>
  );
}

export default function SectionSidebar({ onChange }) {
  const [items, setItems] = useState(defaultSections);

  const toggle = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  useEffect(() => {
    if (onChange) onChange(items);
  }, [items, onChange]);

  const sensors = [];

  return (
    <div className="w-64 p-4 bg-gray-50 border-r border-gray-200">
      <h3 className="text-lg font-bold mb-4">목차 설정</h3>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (active.id !== over?.id) {
            setItems((items) => {
              const oldIndex = items.findIndex((i) => i.id === active.id);
              const newIndex = items.findIndex((i) => i.id === over?.id);
              return arrayMove(items, oldIndex, newIndex);
            });
          }
        }}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItemWrapper key={item.id} item={item} toggle={toggle} />
          ))}
        </SortableContext>
      </DndContext>

      {/* 사진 업로드 테스트 */}
      <div className="mt-6">
        <h4 className="font-semibold mb-2">📸 사진 업로드</h4>
        <input type="file" accept="image/*" className="block w-full" onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              if (onChange) onChange((prev) =>
                prev.map((item) =>
                  item.id === 'photo' ? { ...item, imageUrl: reader.result } : item
                )
              );
            };
            reader.readAsDataURL(file);
          }
        }} />
      </div>
    </div>
  );
}

function SortableItemWrapper({ item, toggle }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });
  return (
    <div ref={setNodeRef}>
      <SortableItem
        item={item}
        attributes={attributes}
        listeners={listeners}
        transform={transform}
        transition={transition}
        isDragging={isDragging}
        toggle={toggle}
      />
    </div>
  );
}
