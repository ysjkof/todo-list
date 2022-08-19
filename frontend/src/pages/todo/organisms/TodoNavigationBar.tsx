import Button from '../../../components/atom/Button';
import { ModeType } from '../../../hooks/useTodo';

interface TodoNavigationBarProps {
  mode: ModeType;
  toggleCreateOrView: () => void;
}
export default function TodoNavigationBar({
  mode,
  toggleCreateOrView,
}: TodoNavigationBarProps) {
  return (
    <div className="flex h-8 justify-end pb-1">
      <Button onClick={toggleCreateOrView} width="lg">
        {mode === 'create' ? '취소' : '새로 만들기'}
      </Button>
    </div>
  );
}
