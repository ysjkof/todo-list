export const isSameTodo = (
  selectedTodoId: string | undefined,
  toBoModifiedTodoId: string | undefined
) => selectedTodoId && toBoModifiedTodoId;

export const TODO_ALERTS = {
  NOT_FOUND: '서버에서 todo를 찾을 수 없습니다',
  FAIL_CREATE: 'Todo 만들기를 실패했습니다',
  NOT_FOUND_INDEX: '출력된 todo 목록에서 선택한 todo를 찾지 못했습니다',
  FAIL_UPDATE: 'Todo 업데이트를 실패했습니다',
  FAIL_DELETE: 'Todo 삭제를 실패했습니다',
};
