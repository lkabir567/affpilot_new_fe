import fs from "fs";
import path from "path";

const pagesPath = path.resolve("src/pages");
let isValid = true;

const validate = () => {
  const topLevelDirs = fs
    .readdirSync(pagesPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const pageFolder of topLevelDirs) {
    const pagePath = path.join(pagesPath, pageFolder);
    const entries = fs.readdirSync(pagePath, { withFileTypes: true });

    const hasSubFolders = entries.some(
      (e) => e.isDirectory() && !["utils", "hooks"].includes(e.name)
    );

    if (hasSubFolders) {
      validateSubPages(pagePath);
    } else {
      validateIndexFile(pagePath, pageFolder);
    }

    validateOptionalFolder(path.join(pagePath, "utils"), "utils");
    validateOptionalFolder(path.join(pagePath, "hooks"), "hooks");
  }

  if (!isValid) {
    console.error("\n🚫 Structure validation failed.\n");
    process.exit(1);
  } else {
    console.log("✅ Structure is valid.");
  }
};

const validateSubPages = (parentPath) => {
  const subDirs = fs
    .readdirSync(parentPath, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !["utils", "hooks"].includes(d.name))
    .map((d) => d.name);

  for (const subFolder of subDirs) {
    const subPath = path.join(parentPath, subFolder);
    const files = fs.readdirSync(subPath);

    const requiredFiles = ["index.tsx", `${capitalize(subFolder)}Form.tsx`];

    for (const file of requiredFiles) {
      if (!files.includes(file)) {
        console.error(
          `❌ Missing "${file}" in ${path.relative(process.cwd(), subPath)}`
        );
        isValid = false;
      }
    }
  }
};

const validateIndexFile = (dirPath, folderName) => {
  const files = fs.readdirSync(dirPath);
  if (!files.includes("index.tsx")) {
    console.error(
      `❌ Missing "index.tsx" in ${path.relative(
        process.cwd(),
        dirPath
      )} (Expected for "${folderName}/")`
    );
    isValid = false;
  }
};

const validateOptionalFolder = (dirPath, type) => {
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath);
  if (files.length === 0) {
    console.warn(
      `⚠️  "${type}" folder is empty: ${path.relative(process.cwd(), dirPath)}`
    );
    return;
  }

  for (const file of files) {
    const ext = path.extname(file);
    if (![".ts", ".tsx"].includes(ext)) continue;

    if (type === "hooks" && !file.startsWith("use")) {
      console.error(
        `❌ Hook file "${file}" in ${dirPath} must start with "use"`
      );
      isValid = false;
    }
    if (type === "utils" && file.toLowerCase().includes("hook")) {
      console.error(
        `❌ Utility file "${file}" in ${dirPath} should not include "hook" in name`
      );
      isValid = false;
    }
  }
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

validate();
