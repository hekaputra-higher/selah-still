import { test } from "node:test";
import assert from "node:assert/strict";
import { emptyAnswers, validateAnswers } from "../lib/reflection";
test("rejects empty and whitespace-only reflections", () => {
  assert.ok(validateAnswers(emptyAnswers));
  assert.ok(validateAnswers({ ...emptyAnswers, write_it: "   " }));
});
test("accepts a response without requiring every prompt", () => {
  assert.equal(
    validateAnswers({
      ...emptyAnswers,
      examine_it: "What does restoration look like?",
    }),
    null,
  );
});
test("rejects oversized responses", () => {
  assert.ok(validateAnswers({ ...emptyAnswers, write_it: "a".repeat(10001) }));
});
