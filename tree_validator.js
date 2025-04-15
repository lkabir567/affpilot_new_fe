// scripts/structure-validator.js
import fs from "fs/promises";
import path from "path";

const PROJECT_RULES = {
  root: {
    requiredFiles: ["package.json", "tsconfig.json", "index.html"],
    allowedExtensions: [
      ".json",
      ".md",
      ".txt",
      ".html",
      ".env",
      ".gitignore",
      "",
      ".js",
      ".cjs",
      ".ts",
      ".tsx",
    ],
    ignorePatterns: [/node_modules/, /\.git/],
  },
  src: {
    requiredDirs: ["components", "utils"],
    allowedExtensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".d.ts", ".scss"],
    maxFileSizeKB: 500,
  },
  public: {
    requiredFiles: ["robots.txt", "vite.svg"],
    allowedExtensions: [
      ".txt",
      ".ico",
      ".svg",
      ".webp",
      ".gif",
      ".json",
      ".html",
      ".png",
      ".jpg",
    ],
  },
};

async function validateFolderStructure() {
  const errors = [];
  const rootPath = process.cwd();

  try {
    await checkDirectory(rootPath, PROJECT_RULES.root, errors, true);

    for (const [dir, rules] of Object.entries(PROJECT_RULES)) {
      if (dir === "root") continue;

      const dirPath = path.join(rootPath, dir);
      try {
        await fs.access(dirPath);
        await checkDirectory(dirPath, rules, errors, false);
      } catch {
        errors.push(`Missing required directory: ${dir}`);
      }
    }

    await checkNamingConventions(rootPath, errors);

    if (errors.length > 0) {
      console.error("\n🚨 Structure validation failed:");
      errors.forEach((e) => console.error(`• ${e}`));
      process.exit(1);
    }

    console.log("\n✅ Project structure validation passed!");
  } catch (error) {
    console.error("\n🔥 Critical error during validation:", error.message);
    process.exit(2);
  }
}

async function checkDirectory(dirPath, rules, errors, isRoot) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile()).map((e) => e.name);
    const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

    // Check required files
    rules.requiredFiles?.forEach((reqFile) => {
      if (!files.includes(reqFile)) {
        errors.push(
          isRoot
            ? `Missing required root file: ${reqFile}`
            : `Missing required file: ${path.join(dirPath, reqFile)}`
        );
      }
    });

    // Check required directories
    rules.requiredDirs?.forEach((reqDir) => {
      if (!dirs.includes(reqDir)) {
        errors.push(
          `Missing required directory: ${path.join(dirPath, reqDir)}`
        );
      }
    });

    // Check file extensions
    files.forEach((file) => {
      const ext = path.extname(file);
      const baseName = path.basename(file);

      // Allow special root files without extension check
      if (isRoot && [".env", ".gitignore"].includes(baseName)) return;

      if (!rules.allowedExtensions?.includes(ext) && ext !== "") {
        errors.push(
          `Disallowed extension in ${path.join(dirPath, file)}: ${
            ext || "none"
          }`
        );
      }
    });

    // Check file sizes
    if (rules.maxFileSizeKB) {
      await Promise.all(
        files.map(async (file) => {
          try {
            const stats = await fs.stat(path.join(dirPath, file));
            if (stats.size > rules.maxFileSizeKB * 1024) {
              errors.push(
                `File too large: ${path.join(dirPath, file)} (${Math.round(
                  stats.size / 1024
                )}KB)`
              );
            }
          } catch (error) {
            errors.push(
              `Error checking file size for ${path.join(dirPath, file)}: ${
                error.message
              }`
            );
          }
        })
      );
    }
  } catch (error) {
    errors.push(`Error accessing directory ${dirPath}: ${error.message}`);
  }
}

async function checkNamingConventions(rootPath, errors) {
  const ignorePatterns = [/node_modules/, /\.git/, /dist/, /build/, /public/];
  const kebabCase = /^[a-z0-9]+(-[a-z0-9]+)*$/;

  async function checkNames(currentPath) {
    try {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);

        if (ignorePatterns.some((pattern) => pattern.test(entry.name)))
          continue;

        // Allow special root files
        if (
          currentPath === rootPath &&
          [".env", ".gitignore", ".husky"].includes(entry.name)
        )
          continue;

        // Check for special characters
        if (/[^\w\-\.]/i.test(entry.name)) {
          errors.push(`Invalid characters in name: ${fullPath}`);
        }

        // Relax directory naming for src and public
        if (entry.isDirectory() && !["src", "public"].includes(entry.name)) {
          if (!kebabCase.test(entry.name)) {
            errors.push(`Directory not kebab-case: ${fullPath}`);
          }
        }

        // Allow files without extensions in specific cases
        if (entry.isFile() && !path.extname(entry.name)) {
          if (
            !["LICENSE", "README", "Dockerfile"].some((name) =>
              entry.name.startsWith(name)
            )
          ) {
            errors.push(`File missing extension: ${fullPath}`);
          }
        }

        if (entry.isDirectory()) {
          await checkNames(fullPath);
        }
      }
    } catch (error) {
      errors.push(`Error checking names in ${currentPath}: ${error.message}`);
    }
  }

  await checkNames(rootPath);
}

// Run the validator
validateFolderStructure();
