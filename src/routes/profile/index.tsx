import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/profile/")({
  component: Profile,
});

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <Link to="/">Home</Link>
    </div>
  );
}
