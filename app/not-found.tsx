import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen p-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Not Found</h2>
      <p className="text-1xl mb-4">Could not find requested resource</p>
      <Link
        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
