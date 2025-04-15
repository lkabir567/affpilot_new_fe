#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";

interface Node {
  name: string;
  children: Node[];
  isFile: boolean;
}

function parseTree(input: string): Node[] {
  const lines = input.split("\n").filter(Boolean);
  const stack: Array<{ indent: number; node: Node }> = [];
  const root: Node[] = [];

  for (const line of lines) {
    const indent = line.search(/\S/);
    const name = line.trim();
    const isFile = /\.\w+$/.test(name);
    const node: Node = { name, children: [], isFile };

    while (stack.length && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(node);
      stack.push({ indent, node });
    } else {
      stack[stack.length - 1].node.children.push(node);
      stack.push({ indent, node });
    }
  }

  return root;
}

async function validateTree(
  nodes: Node[],
  basePath: string,
  relativePath = ""
) {
  let errorCount = 0;

  for (const node of nodes) {
    const fullPath = path.join(basePath, node.name);
    const relPath = path.join(relativePath, node.name);

    try {
      await fs.access(fullPath);
    } catch {
      console.error(
        `❌ Missing ${node.isFile ? "file" : "folder"}: ${relPath}`
      );
      errorCount++;
      continue;
    }

    if (!node.isFile && node.children.length > 0) {
      errorCount += await validateTree(node.children, fullPath, relPath);
    }
  }

  return errorCount;
}

async function main() {
  try {
    const structure = await fs.readFile("expected_structure.txt", "utf-8");
    const parsed = parseTree(structure);
    const errors = await validateTree(parsed, ".");

    if (errors > 0) {
      console.error(`\n🚨 Found ${errors} validation errors!`);
      process.exit(1);
    }

    console.log("\n✅ All files and directories match the expected structure");
    process.exit(0);
  } catch (error) {
    console.error(
      "\n🔥 Error:",
      error instanceof Error ? error.message : error
    );
    process.exit(2);
  }
}

main();
