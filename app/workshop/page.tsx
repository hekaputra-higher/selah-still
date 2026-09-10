import Link from "next/link";
export default function Workshop() {
  return (
    <main>
      <p className="eyebrow">FAITHTECH VANCOUVER · START HERE</p>
      <h1>
        Bring your idea.
        <br />
        <em>Take one step.</em>
      </h1>
      <p>
        Something exists when you leave tonight that did not exist when you
        arrived.
      </p>
      <ol className="resource-list">
        {[
          "What are you building? Describe it in one sentence.",
          "Who is it for? Picture one person.",
          "What problem does it solve? Name one moment in their day.",
          "What is the smallest useful version? Choose one complete journey.",
          "What context does your AI need? Include constraints and what it must never do.",
          "Ask for a plan before coding. Read it and correct assumptions.",
          "Build one useful slice. Keep changes small.",
          "Test it. Try mobile, keyboard, mistakes, empty states and privacy.",
          "Deploy if you can. Review a preview before releasing.",
          "Learn and iterate. Ask someone to try it.",
        ].map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ol>
      <h2>Your first prompt</h2>
      <blockquote>
        I want to build [idea] for [person] who needs [need]. Tonight the
        smallest useful version is [one journey]. It must [constraints] and must
        never [anti-goals]. Ask up to three questions that materially change the
        scope. Then propose a small plan. Do not write code yet.
      </blockquote>
      <h2>Choose your next step</h2>
      <p>
        New to building? A clear idea and one working screen is a win.
        Comfortable? Add a useful feature, Git, and a preview. Experienced?
        Explore auth, persistence and evidence that access rules work.
      </p>
      <p>
        Use the tool you already have. A backend is optional for your project
        tonight. Pair up if setup gets in the way.
      </p>
      <h2>When you need help</h2>
      <p>
        Raise your hand. Tell Hadi what you expected, what happened, and the
        smallest thing you need to unblock.
      </p>
      <Link href="/">Explore Selah Still →</Link>
    </main>
  );
}
