import Button from '../atom/Button';

interface TodoTitleListProps {
  id: string;
  title: string;
  isModified: boolean;
  showTotoDetail: () => void;
  toggleUpdateInput: () => void;
  deleteTodo: () => void;
}

export default function TodoTitleList({
  title,
  isModified,
  showTotoDetail,
  toggleUpdateInput,
  deleteTodo,
}: TodoTitleListProps) {
  return (
    <div className="flex py-0.5 justify-end gap-2">
      <span className="w-full" onClick={showTotoDetail}>
        {title}
      </span>
      <Button onClick={toggleUpdateInput}>
        {isModified ? '취소' : '수정'}
      </Button>
      <Button onClick={deleteTodo}>지우기</Button>
    </div>
  );
}
