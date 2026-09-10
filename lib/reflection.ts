export type Answers = {
  draw_near: string;
  write_it: string;
  examine_it: string;
  look_at_him: string;
  listen_live_it: string;
};
export type Reflection = Answers & {
  id: string;
  user_id: string;
  passage_id: string;
  created_at: string;
  updated_at: string;
};
export const emptyAnswers: Answers = {
  draw_near: "",
  write_it: "",
  examine_it: "",
  look_at_him: "",
  listen_live_it: "",
};
export function validateAnswers(answers: Answers): string | null {
  if (Object.values(answers).some((x) => x.length > 10000))
    return "Please keep each response under 10,000 characters.";
  if (!Object.values(answers).some((x) => x.trim()))
    return "Write at least one response before saving.";
  return null;
}
