import { Users } from "../components/Users";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="m-4">
        <Users />
      </div>
    </main>
  );
}
