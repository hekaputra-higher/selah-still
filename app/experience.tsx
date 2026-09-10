"use client";
import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Link from 'next/link';
import { supabase } from "../lib/supabase";
import { chapter, prompts } from "../lib/scripture";
import {
  emptyAnswers,
  validateAnswers,
  type Answers,
  type Reflection,
} from "../lib/reflection";

export default function Experience() {
  const [view, setView] = useState<"read" | "reflect" | "journal" | "auth">(
    "read",
  );
  const [full, setFull] = useState(false),
    [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ ...emptyAnswers });
  const [user, setUser] = useState<User | null>(null),
    [ready, setReady] = useState(!supabase);
  const [rows, setRows] = useState<Reflection[]>([]),
    [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(""),
    [error, setError] = useState("");
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [signup, setSignup] = useState(false);
  const [offline, setOffline] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!supabase) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setReady(true);
      setRows([]);
    });
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    heading.current?.focus();
  }, [view, step]);
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (Object.values(answers).some(Boolean)) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [answers]);
  function go(next: typeof view) {
    setError("");
    setNotice("");
    setView(next);
  }
  async function journal() {
    go("journal");
    if (offline) {
      try {
        setRows(JSON.parse(sessionStorage.getItem("selah-rehearsal") || "[]"));
      } catch {
        setError("The rehearsal journal could not be read.");
      }
      return;
    }
    if (!supabase || !user) return;
    setBusy(true);
    try {
      const { data, error } = await supabase
        .from("reflections")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setRows(data ?? []);
    } catch {
      setError("Your reflections could not be loaded. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  async function save() {
    const invalid = validateAnswers(answers);
    if (invalid) {
      setError(invalid);
      return;
    }
    if (!offline && !user) {
      go("auth");
      setNotice(
        "Sign in to save your reflection. Your writing stays here while you sign in.",
      );
      return;
    }
    setBusy(true);
    setError("");
    try {
      if (offline) {
        const old = JSON.parse(
          sessionStorage.getItem("selah-rehearsal") || "[]",
        );
        sessionStorage.setItem(
          "selah-rehearsal",
          JSON.stringify([
            {
              ...answers,
              id: crypto.randomUUID(),
              user_id: "rehearsal",
              passage_id: "psalm-23",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            ...old,
          ]),
        );
      } else {
        if (!supabase || !user) throw Error("Unavailable");
        const { error } = await supabase
          .from("reflections")
          .insert({ ...answers, user_id: user.id, passage_id: "psalm-23" });
        if (error) throw error;
      }
      setAnswers({ ...emptyAnswers });
      setNotice(
        offline
          ? "Saved in this tab for rehearsal."
          : "Your reflection has been saved.",
      );
    } catch {
      setError(
        "We could not save your reflection. Your writing is still here. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function authenticate(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError("");
    try {
      const result = signup
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });
      if (result.error) throw result.error;
      setPassword("");
      if (result.data.session) {
        setUser(result.data.user);
        go("reflect");
        setNotice("Signed in. You can now save your reflection.");
      } else
        setNotice(
          "Check your email to confirm your account, then return here to sign in.",
        );
    } catch {
      setError(
        signup
          ? "Account creation was not completed. Check your details or try signing in."
          : "Sign-in failed. Check your email and password and try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function signout() {
    if (
      Object.values(answers).some(Boolean) &&
      !window.confirm("Sign out and clear your unsaved writing?")
    )
      return;
    setBusy(true);
    const result = await supabase?.auth.signOut();
    setBusy(false);
    if (result?.error) {
      setError("Sign-out did not complete. Please try again.");
      return;
    }
    setUser(null);
    setRows([]);
    setAnswers({ ...emptyAnswers });
    go("read");
  }
  const p = prompts[step];
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <Link className="brand" href="/" aria-label="Selah Still home">
          selah <em>still</em>
          <span className="brand-mark">✧</span>
        </Link>
        <nav aria-label="Main">
          <button
            onClick={() => go("read")}
            aria-current={view === "read" ? "page" : undefined}
          >
            Scripture
          </button>
          <button
            onClick={journal}
            aria-current={view === "journal" ? "page" : undefined}
          >
            My reflections
          </button>
          {user ? (
            <button disabled={busy} onClick={signout}>
              Sign out
            </button>
          ) : (
            <button onClick={() => go("auth")}>Sign in</button>
          )}
        </nav>
      </header>
      <main id="main">
        {offline && (
          <aside className="rehearsal">
            Rehearsal mode · fictional writing only · saved in this browser tab,
            not a private account
          </aside>
        )}
        <div
          role="status"
          aria-live="polite"
          className={notice ? "notice" : ""}
        >
          {notice}
        </div>
        {error && (
          <div role="alert" className="error">
            {error}
          </div>
        )}
        {view === "read" && (
          <>
            <section className="intro">
              <p className="eyebrow">A MOMENT IN THE WORD</p>
              <h1 ref={heading} tabIndex={-1}>
                Be here.
                <br />
                <em>He is near.</em>
              </h1>
              <p className="lead">
                Set down the noise for a moment.
                <br />
                Let Scripture meet you where you are.
              </p>
              <div className="divider">✧</div>
            </section>
            <article className="passage">
              <div className="passage-heading">
                <h2>Psalm 23{full ? "" : ":1–3"}</h2>
                <span>WORLD ENGLISH BIBLE</span>
              </div>
              {chapter.slice(0, full ? 6 : 3).map((verse, i) => (
                <p key={i}>
                  <sup>{i + 1}</sup>
                  {verse}
                </p>
              ))}
              <button
                className="text-button"
                aria-expanded={full}
                onClick={() => setFull(!full)}
              >
                {full ? "Return to the passage" : "Read the whole chapter"}{" "}
                <span aria-hidden="true">↗</span>
              </button>
              <p className="source">
                Scripture: World English Bible · Public domain ·{" "}
                <a
                  href="https://ebible.org/web/PSA023.htm"
                  target="_blank"
                  rel="noreferrer"
                >
                  Source
                </a>
              </p>
            </article>
            <section className="invitation">
              <p>Stay with what stood out.</p>
              <button
                className="primary"
                onClick={() => {
                  setStep(0);
                  go("reflect");
                }}
              >
                Begin D.W.E.L.L. <span aria-hidden="true">→</span>
              </button>
              <small>Five gentle invitations. Move at your own pace.</small>
            </section>
          </>
        )}
        {view === "reflect" && (
          <section className="reflection">
            <p className="eyebrow">D.W.E.L.L. · PSALM 23</p>
            <div className="steps" aria-label="Reflection steps">
              {prompts.map((x, i) => (
                <button
                  key={x.key}
                  aria-label={x.title}
                  aria-current={step === i ? "step" : undefined}
                  onClick={() => setStep(i)}
                >
                  {x.letter}
                </button>
              ))}
            </div>
            <p className="eyebrow">{step + 1} OF 5</p>
            <h1 ref={heading} tabIndex={-1}>
              {p.title}
            </h1>
            <p className="question">{p.question}</p>
            <p className="muted">{p.hint}</p>
            <details>
              <summary>Keep Scripture nearby</summary>
              {chapter.map((x, i) => (
                <p key={i}>
                  {i + 1}. {x}
                </p>
              ))}
            </details>
            <label htmlFor="response">
              {step === 0
                ? "A prayer or intention (optional)"
                : "Your response"}
            </label>
            <textarea
              id="response"
              value={answers[p.key]}
              maxLength={10000}
              rows={7}
              placeholder="There is room for your honest words…"
              onChange={(e) => {
                setAnswers({ ...answers, [p.key]: e.target.value });
                setNotice("");
              }}
            />
            <p className="privacy">
              {offline
                ? "Rehearsal writing stays in this tab."
                : "Your writing is saved to your account only when you choose Save reflection."}
            </p>
            <div className="actions">
              <button
                disabled={step === 0 || busy}
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
              {step < 4 ? (
                <button className="primary" onClick={() => setStep(step + 1)}>
                  Continue →
                </button>
              ) : (
                <button disabled={busy} className="primary" onClick={save}>
                  {busy ? "Saving…" : "Save reflection"}
                </button>
              )}
            </div>
            {notice.includes("saved") && (
              <button className="text-button" onClick={journal}>
                Read my reflections →
              </button>
            )}
          </section>
        )}
        {view === "auth" && (
          <section className="auth">
            <p className="eyebrow">A PLACE TO RETURN</p>
            <h1 ref={heading} tabIndex={-1}>
              {signup ? "Make room." : "Welcome back."}
            </h1>
            <p>Save your reflections and return to them in your own time.</p>
            {supabase ? (
              <form onSubmit={authenticate}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  minLength={8}
                  autoComplete={signup ? "new-password" : "current-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="primary" disabled={busy}>
                  {busy
                    ? "Please wait…"
                    : signup
                      ? "Create account"
                      : "Sign in"}
                </button>
                <button
                  type="button"
                  className="text-button"
                  onClick={() => setSignup(!signup)}
                >
                  {signup
                    ? "Already have an account? Sign in"
                    : "New here? Create an account"}
                </button>
              </form>
            ) : (
              <>
                <p className="notice">
                  Account saving is not configured in this copy. You can still
                  read and reflect.
                </p>
                <button className="primary" onClick={() => go("reflect")}>
                  Continue reflecting
                </button>
                <p>
                  Facilitating a demo? Use fictional text only in rehearsal
                  mode.
                </p>
                <button
                  onClick={() => {
                    setOffline(true);
                    go("reflect");
                  }}
                >
                  Enter local rehearsal
                </button>
              </>
            )}
          </section>
        )}
        {view === "journal" && (
          <section className="journal">
            <p className="eyebrow">WORDS TO RETURN TO</p>
            <h1 ref={heading} tabIndex={-1}>
              My reflections
            </h1>
            {!ready || busy ? (
              <p role="status">Loading your reflections…</p>
            ) : !user && !offline ? (
              <>
                <p>Sign in to return to your saved reflections.</p>
                <button className="primary" onClick={() => go("auth")}>
                  Sign in
                </button>
              </>
            ) : rows.length === 0 ? (
              <>
                <p>No saved reflections yet. Begin with a few honest words.</p>
                <button className="primary" onClick={() => go("read")}>
                  Return to Scripture
                </button>
                <button onClick={journal}>Refresh reflections</button>
              </>
            ) : (
              <>
                {rows.map((row) => (
                  <article className="saved" key={row.id}>
                    <p className="eyebrow">
                      PSALM 23 ·{" "}
                      {new Date(row.created_at).toLocaleDateString("en-CA")}
                    </p>
                    {prompts.map(
                      (x) =>
                        row[x.key] && (
                          <div key={x.key}>
                            <h2>{x.title}</h2>
                            <p>{row[x.key]}</p>
                          </div>
                        ),
                    )}
                  </article>
                ))}
                <button onClick={journal}>Refresh reflections</button>
              </>
            )}
          </section>
        )}
      </main>
      <footer>
        <span>selah still</span>
        <p>A little space. A slower pace. A heart turned toward God.</p>
        <a href="/workshop">FaithTech workshop resources</a>
      </footer>
    </>
  );
}
