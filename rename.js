/**
 * Rename script. Run with `npm ci && npm run rename`.
 *
 * Run before copying the acf-FIELD-NAME folder to your theme or plugin so that
 * you don't have to replace placeholder strings like `FIELD-NAME` manually.
 *
 * This script should not be copied to your theme or plugin.
 */
const prompts = require("prompts");
const fs = require("fs");
const path = require("path");

const questions = [
  {
    type: "text",
    name: "fieldLabel",
    message: "Field label:",
    initial: "Amazing Field",
    validate: (text) =>
      text.match(/[^A-Za-z0-9_-\s]/g)
        ? "Label allows alphanumeric English characters, spaces, underscores and dashes."
        : true,
  },
  {
    type: "text",
    name: "prefix",
    message: "Function prefix:",
    initial: "company_or_project_name",
    validate: (text) =>
      text.match(/[^a-z0-9_]/g)
        ? "Prefix allows lowercase alphanumeric English characters and underscores."
        : true,
  },
  {
    type: "text",
    name: "textDomain",
    message: "Text domain:",
    initial: "plugin-or-theme-name",
    validate: (text) =>
      text.match(/[^a-z0-9-]/g) ? "Text domain allows a-z, 0-9 and '-'." : true,
  },
];

(async () => {
  const dir = path.resolve(__dirname, "acf-FIELD-NAME");
  if (!fs.existsSync(dir)) {
    console.error("Could not find the acf-FIELD-NAME folder.");
    console.error("You can ony rename a fresh copy of the repo.");
    process.exit(1);
  }

  const response = await prompts(questions);

  if (!response.fieldLabel || !response.prefix || !response.textDomain) {
    console.error("You must provide all placeholder string replacements.");
    process.exit(1);
  }

  const replacements = {
    "class-PREFIX": "class-" + response.prefix.replace(/_/g, "-"),
    PREFIX: response.prefix,
    FIELD_LABEL: response.fieldLabel,
    FIELD_NAME: response.fieldLabel.toLowerCase().replace(/[-\s]/g, "_"),
    "FIELD-NAME": response.fieldLabel.toLowerCase().replace(/[_\s]/g, "-"),
    TEXTDOMAIN: response.textDomain,
  };

  console.log("Replacing in file names…");
  renameFiles(replacements);

  console.log("Replacing in file contents…");
  replaceStrings(replacements);

  console.log("Done.");
})();

/**
 * Renames files and folders in the current directory.
 *
 * @param {object} replacements Replace keys with their values.
 */
const renameFiles = (replacements = {}) => {
  const dir = path.resolve(__dirname);

  /**
   * Rename acf-FIELD-NAME directory first. Prevents write failure during file
   * renames due to parent directory being renamed by the first find-replace.
   */
  fs.renameSync(
    path.resolve(__dirname, "acf-FIELD-NAME"),
    path.resolve(
      __dirname,
      "acf-FIELD-NAME".replace(/FIELD-NAME/g, replacements["FIELD-NAME"])
    )
  );

  const files = walkSync(dir);

  files.forEach((file) => {
    let newPath = Object.keys(replacements).reduce(
      (acc, key) => acc.replace(new RegExp(key, "g"), replacements[key]),
      file
    );

    fs.renameSync(file, newPath);
  });
};

const replaceStrings = (replacements = {}) => {
  const dir = path.resolve(__dirname);
  const files = walkSync(dir);

  files.forEach((file) => {
    const oldContent = fs.readFileSync(file, "utf8");

    let newFileContent = Object.keys(replacements).reduce(
      (acc, key) => acc.replace(new RegExp(key, "g"), replacements[key]),
      oldContent
    );

    fs.writeFileSync(file, newFileContent, "utf8");
  });
};

/**
 * Gets all files in `dir` excluding repo paths such as node_modules.
 *
 * @param {string} dir
 * @param {array} filelist List of existing files to append to.
 * @returns {array} List of files.
 */
const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach((file) => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist.filter(
    (path) => !path.match(/node_modules|\.git|package-lock|rename\.js/)
  );
};
