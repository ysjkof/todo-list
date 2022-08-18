export default function Toast({ message }: { message: string }) {
  return (
    <div className="fixed top-10 right-10 z-50 animate-fadeout rounded-md border bg-sky-600 px-2 text-3xl text-white">
      {message}
    </div>
  );
}
