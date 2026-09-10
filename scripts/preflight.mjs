import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
if (existsSync(".env.local")) process.loadEnvFile(".env.local");
let failed = 0,
  warnings = 0;
const run = (name, cmd, args) => {
  const r = spawnSync(cmd, args, {
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  console.log(`${r.status === 0 ? "PASS" : "FAIL"} ${name}`);
  if (r.status !== 0) {
    failed++;
    console.log((r.stdout || "").slice(-2500));
    console.log((r.stderr || "").slice(-1500));
  }
  return r;
};
const status = run("Git accessible", "git", ["status", "--porcelain"]);
if (status.stdout?.trim()) {
  warnings++;
  console.log("WARNING working tree contains changes; inspect before demo.");
}
run("Current branch", "git", ["branch", "--show-current"]);
const remote = spawnSync("git", ["remote", "get-url", "origin"], {
  encoding: "utf8",
});
if (remote.status === 0)
  run("GitHub remote reachable", "git", [
    "ls-remote",
    "--exit-code",
    "origin",
    "HEAD",
  ]);
else {
  warnings++;
  console.log("WARNING GitHub origin is not configured");
}
for (const key of [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
]) {
  if (!process.env[key]) {
    warnings++;
    console.log(`WARNING ${key} is missing`);
  }
}
for (const script of ["format:check", "lint", "typecheck", "test", "build"])
  run(script, "npm", ["run", script]);
const tracked =
  spawnSync("git", ["ls-files"], { encoding: "utf8" }).stdout || "";
if (
  tracked
    .split("\n")
    .some((x) => /(^|\/)\.env/.test(x) && !x.endsWith(".env.example"))
) {
  failed++;
  console.log("FAIL tracked environment file");
} else console.log("PASS no environment files tracked");
if (process.env.TEST_USER_A_EMAIL && process.env.TEST_USER_B_EMAIL)
  run("Live Auth and RLS", "npm", ["run", "test:rls"]);
else {
  warnings++;
  console.log("WARNING live Auth/RLS not tested: configure two test accounts.");
}
for (const key of ["PRODUCTION_URL", "PREVIEW_URL"]) {
  if (!process.env[key]) {
    warnings++;
    console.log(`WARNING ${key} not configured`);
    continue;
  }
  try {
    const r = await fetch(process.env[key], {
      signal: AbortSignal.timeout(15000),
    });
    if (!r.ok) throw Error(`HTTP ${r.status}`);
    if (new URL(r.url).hostname !== new URL(process.env[key]).hostname)
      throw Error(
        "Redirected to another host; verify deployment access in your browser",
      );
    console.log(`PASS ${key} reachable`);
  } catch (e) {
    failed++;
    console.log(`FAIL ${key}: ${e.message}`);
  }
}
console.log(
  `\n${failed ? "FAIL" : warnings ? "WARNING" : "PASS"} — ${failed} failures, ${warnings} warnings. Browser, projector and account review are still manual.`,
);
process.exitCode = failed ? 1 : 0;
