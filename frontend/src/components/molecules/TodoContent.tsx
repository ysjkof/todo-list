interface TodoTitleContentProps {
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
}

export default function TodoContent({
  createdAt,
  updatedAt,
  title,
  content,
}: TodoTitleContentProps) {
  return (
    <div className="flex h-full w-full flex-col p-2">
      <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-extrabold">
        {title}
      </h3>
      <span className="text-xs text-gray-500">생성: {createdAt}</span>
      <span className="text-xs text-gray-500">수정: {updatedAt}</span>
      <p
        className="overflow-y-scroll p-2"
        style={{ height: 'calc(100% - 4rem)' }}
      >
        {content}
      </p>
    </div>
  );
}
