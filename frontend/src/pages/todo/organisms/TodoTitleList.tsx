import { cls } from '../../../utils/utils';
import Button from '../../../components/atom/Button';

interface TodoTitleListProps {
  id: string;
  title: string;
  isModified: boolean;
  isSelect: boolean;
  showTodoDetail: () => void;
  toggleEditOrView: () => void;
  deleteTodo: () => void;
}

export default function TodoTitleList({
  title,
  isModified,
  isSelect,
  showTodoDetail,
  toggleEditOrView,
  deleteTodo,
}: TodoTitleListProps) {
  return (
    <div
      className={cls(
        'grid w-full grid-cols-[1fr,_3rem,_4rem]  gap-1 py-1 px-2 hover:bg-orange-100',
        isSelect ? 'bg-orange-200' : ''
      )}
    >
      <span
        className="overflow-hidden text-ellipsis whitespace-nowrap"
        onClick={showTodoDetail}
      >
        {title}
      </span>
      <Button onClick={toggleEditOrView} disable={isModified}>
        {isModified ? '취소' : '수정'}
      </Button>
      <Button onClick={deleteTodo}>지우기</Button>
    </div>
  );
}
