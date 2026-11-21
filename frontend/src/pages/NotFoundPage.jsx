import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="panel" data-testid="not-found">
      <h2>This page does not exist</h2>
      <p className="info">The address you opened does not lead anywhere.</p>
      <Link to="/">Back to inventory</Link>
    </section>
  );
}