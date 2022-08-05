interface ErrorMessageProps {
  textContent: string;
}

export default function ErrorMessage({ textContent }: ErrorMessageProps) {
  return (
    <button className={'text-orange-500 absolute bottom-2'}>
      {textContent}
    </button>
  );
}
