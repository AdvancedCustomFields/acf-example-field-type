/**
 * Rename script. Run with `npm ci && npm run rename`.
 *
 * Run before copying the acf-FIELD-NAME folder to your theme or plugin so that
 * you don't have to replace placeholder strings like `FIELD-NAME` manually.
 *
 * This script should not be copied to your theme or plugin.
 */
const prompts = require("prompts");

const questions = [
  {
    type: "text",
    name: "fieldLabel",
    message: "Field label:",
    initial: "Amazing Field",
  },
  {
    type: "text",
    name: "prefix",
    message: "Function prefix:",
    initial: "company_or_project_name",
  },
  {
    type: "text",
    name: "textDomain",
    message: "Text domain:",
    initial: "plugin-or-theme-name",
  },
];

(async () => {
  console.log("Type your placeholder string replacements:");
  const response = await prompts(questions);

  // TODO: If anything is empty due to user pressing Ctrl+C, exit.
  // console.log(response); // => { username, age, about }
})();
