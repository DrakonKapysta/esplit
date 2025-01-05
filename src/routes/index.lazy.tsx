import { Button } from "@/components/ui/button";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="text-center p-4 border rounded-md shadow flex-1">
      <h1>Index Page</h1>
      <p>This is the index page</p>
      <Link to="/profile">Profile</Link>
      <Button variant={"outline"}>Home button</Button>
    </div>
  );
}
