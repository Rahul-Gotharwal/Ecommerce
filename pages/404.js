import Link from 'next/link';

export default function FourOhFour() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">404 - Page Not Found</h1>
      <button className="bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600">
        <Link href="/">
          Go back home
        </Link>
      </button>
    </div>
  );
}
