export default function Spinner() {
  return (
    <div className="relative flex h-full w-full items-center justify-center ">
      <div className="absolute flex h-full w-full items-center justify-center">
        <svg
          className="animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
        </svg>
      </div>
    </div>
  );
}
