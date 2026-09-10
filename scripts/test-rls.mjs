import { createClient } from "@supabase/supabase-js";
import assert from "node:assert/strict";
const env = process.env;
const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "TEST_USER_A_EMAIL",
  "TEST_USER_A_PASSWORD",
  "TEST_USER_B_EMAIL",
  "TEST_USER_B_PASSWORD",
];
if (required.some((k) => !env[k])) {
  console.error(
    "BLOCKED: configure URL, publishable key and two confirmed test accounts in .env.local.",
  );
  process.exit(2);
}
const make = () =>
  createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
const a = make(),
  b = make(),
  anon = make();
let id;
try {
  const ar = await a.auth.signInWithPassword({
    email: env.TEST_USER_A_EMAIL,
    password: env.TEST_USER_A_PASSWORD,
  });
  assert.ifError(ar.error);
  const br = await b.auth.signInWithPassword({
    email: env.TEST_USER_B_EMAIL,
    password: env.TEST_USER_B_PASSWORD,
  });
  assert.ifError(br.error);
  assert.notEqual(ar.data.user.id, br.data.user.id);
  const inserted = await a
    .from("reflections")
    .insert({
      user_id: ar.data.user.id,
      passage_id: "psalm-23",
      write_it: "Fictional RLS test",
    })
    .select()
    .single();
  assert.ifError(inserted.error);
  id = inserted.data.id;
  const other = await b.from("reflections").select("*").eq("id", id);
  assert.ifError(other.error);
  assert.equal(other.data.length, 0);
  const unauth = await anon.from("reflections").select("*").eq("id", id);
  assert.ok(unauth.error || unauth.data.length === 0);
  const tamper = await b
    .from("reflections")
    .update({ write_it: "tampered" })
    .eq("id", id)
    .select();
  assert.ok(tamper.error || tamper.data.length === 0);
  const steal = await a
    .from("reflections")
    .update({ user_id: br.data.user.id })
    .eq("id", id);
  assert.ok(steal.error);
  const forge = await b.from("reflections").insert({
    user_id: ar.data.user.id,
    passage_id: "psalm-23",
    write_it: "forged",
  });
  assert.ok(forge.error);
  const remove = await b.from("reflections").delete().eq("id", id).select();
  assert.ok(remove.error || remove.data.length === 0);
  const own = await a.from("reflections").select("*").eq("id", id).single();
  assert.ifError(own.error);
  assert.equal(own.data.write_it, "Fictional RLS test");
  console.log(
    "PASS: real Auth, persistence, owner read, cross-user read/update/delete denial, ownership reassignment denial, forged insert denial, anonymous denial.",
  );
} catch (e) {
  console.error("FAIL:", e.message);
  process.exitCode = 1;
} finally {
  if (id) {
    const cleanup = await a.from("reflections").delete().eq("id", id);
    if (cleanup.error) console.error("WARNING: test-row cleanup failed.");
  }
  await a.auth.signOut();
  await b.auth.signOut();
}
