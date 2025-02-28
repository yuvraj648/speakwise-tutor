
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-zinc-600 mb-8">The page you're looking for doesn't exist.</p>
      <Button asChild>
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  );
}
