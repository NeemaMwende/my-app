import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-gray-100 shadow">
      <div className="text-lg font-bold">Contact App</div>
      <Menu className="h-6 w-6" />
    </nav>
  );
}
