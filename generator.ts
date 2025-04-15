// How to run this:
// npm install -D ts-node typescript
// npx ts-node generator.ts
// don't run this file directly

import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

type FileOrFolder = {
  name: string;
  type: "folder" | "file";
  children?: FileOrFolder[];
};

const structure: FileOrFolder[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "app",
        type: "folder",
        children: [
          {
            name: "config",
            type: "folder",
            children: [{ name: "routes.tsx", type: "file" }],
          },
          {
            name: "core",
            type: "folder",
            children: [
              {
                name: "route-protection",
                type: "folder",
                children: [{ name: "AuthGuard.tsx", type: "file" }],
              },
              { name: "App.tsx", type: "file" },
              { name: "AppProviders.tsx", type: "file" },
            ],
          },
        ],
      },
      {
        name: "assets",
        type: "folder",
        children: [
          {
            name: "data",
            type: "folder",
            children: [{ name: "featureList.ts", type: "file" }],
          },
          { name: "react.svg", type: "file" },
        ],
      },
      {
        name: "components",
        type: "folder",
        children: [
          {
            name: "creditsCard",
            type: "folder",
            children: [{ name: "SideBarCredits.tsx", type: "file" }],
          },
          {
            name: "features",
            type: "folder",
            children: [{ name: "Features.tsx", type: "file" }],
          },
          {
            name: "header",
            type: "folder",
            children: [{ name: "Header.tsx", type: "file" }],
          },
          {
            name: "mobileMenu",
            type: "folder",
            children: [{ name: "MobileMenu.tsx", type: "file" }],
          },
          {
            name: "settings",
            type: "folder",
            children: [{ name: "ColorPicker.tsx", type: "file" }],
          },
          {
            name: "sidebar",
            type: "folder",
            children: [
              { name: "Navigation.tsx", type: "file" },
              { name: "SideBar.tsx", type: "file" },
            ],
          },
          {
            name: "theme",
            type: "folder",
            children: [{ name: "ThemeToggle.tsx", type: "file" }],
          },
          {
            name: "ui",
            type: "folder",
            children: [
              { name: "avatar.tsx", type: "file" },
              { name: "button.tsx", type: "file" },
              { name: "card.tsx", type: "file" },
              { name: "checkbox.tsx", type: "file" },
              { name: "collapsible.tsx", type: "file" },
              { name: "form.tsx", type: "file" },
              { name: "input.tsx", type: "file" },
              { name: "label.tsx", type: "file" },
              { name: "progress.tsx", type: "file" },
              { name: "sheet.tsx", type: "file" },
            ],
          },
        ],
      },
      {
        name: "features",
        type: "folder",
        children: [
          {
            name: "auth",
            type: "folder",
            children: [
              {
                name: "components",
                type: "folder",
                children: [
                  { name: "ForgetPasswordForm.tsx", type: "file" },
                  { name: "LoginForm.tsx", type: "file" },
                  { name: "ResetPasswordForm.tsx", type: "file" },
                  { name: "SignUpForm.tsx", type: "file" },
                ],
              },
              {
                name: "hooks",
                type: "folder",
                children: [{ name: "useAuth.ts", type: "file" }],
              },
              {
                name: "schemas",
                type: "folder",
                children: [{ name: "auth.schemas.ts", type: "file" }],
              },
              { name: "types", type: "folder", children: [] },
              {
                name: "utils",
                type: "folder",
                children: [{ name: "passwordIndicator.ts", type: "file" }],
              },
              { name: "index.ts", type: "file" },
            ],
          },
          {
            name: "dashboard",
            type: "folder",
            children: [
              { name: "content-generation", type: "folder", children: [] },
              {
                name: "overview",
                type: "folder",
                children: [
                  {
                    name: "components",
                    type: "folder",
                    children: [
                      { name: "CreditsCard.tsx", type: "file" },
                      { name: "RecentActivity.tsx", type: "file" },
                      { name: "SearchBar.tsx", type: "file" },
                      { name: "StatsCard.tsx", type: "file" },
                      { name: "ToolCard.tsx", type: "file" },
                      { name: "ToolsGrid.tsx", type: "file" },
                      { name: "ToolsTabs.tsx", type: "file" },
                    ],
                  },
                  {
                    name: "hooks",
                    type: "folder",
                    children: [
                      { name: "useActivityFeed.ts", type: "file" },
                      { name: "useFeatureList.ts", type: "file" },
                    ],
                  },
                  {
                    name: "types",
                    type: "folder",
                    children: [{ name: "activity.types.ts", type: "file" }],
                  },
                  { name: "index.ts", type: "file" },
                ],
              },
            ],
          },
        ],
      },
      { name: "hooks", type: "folder", children: [] },
      {
        name: "lib",
        type: "folder",
        children: [
          {
            name: "images",
            type: "folder",
            children: [{ name: "importImage.ts", type: "file" }],
          },
          { name: "dot.env.ts", type: "file" },
          { name: "utils.ts", type: "file" },
        ],
      },
      {
        name: "pages",
        type: "folder",
        children: [
          {
            name: "private",
            type: "folder",
            children: [
              {
                name: "dashboard",
                type: "folder",
                children: [
                  {
                    name: "overview",
                    type: "folder",
                    children: [{ name: "OverviewPage.tsx", type: "file" }],
                  },
                  { name: "DashboardLayout.tsx", type: "file" },
                ],
              },
            ],
          },
          {
            name: "public",
            type: "folder",
            children: [
              {
                name: "forget-password",
                type: "folder",
                children: [{ name: "ForgetPasswordPage.tsx", type: "file" }],
              },
              {
                name: "login",
                type: "folder",
                children: [{ name: "LoginPage.tsx", type: "file" }],
              },
              {
                name: "reset-password",
                type: "folder",
                children: [{ name: "ResetPasswordPage.tsx", type: "file" }],
              },
              {
                name: "signup",
                type: "folder",
                children: [{ name: "SignupPage.tsx", type: "file" }],
              },
            ],
          },
        ],
      },
      {
        name: "providers",
        type: "folder",
        children: [
          {
            name: "theme-provider",
            type: "folder",
            children: [
              { name: "ThemeContext.tsx", type: "file" },
              { name: "ThemeProvider.tsx", type: "file" },
            ],
          },
        ],
      },
      {
        name: "redux",
        type: "folder",
        children: [
          {
            name: "api",
            type: "folder",
            children: [
              { name: "auth.api.ts", type: "file" },
              { name: "index.ts", type: "file" },
              { name: "task.api.ts", type: "file" },
            ],
          },
          {
            name: "hooks",
            type: "folder",
            children: [
              { name: "useAppDispatch.ts", type: "file" },
              { name: "useAppSelector.ts", type: "file" },
            ],
          },
          {
            name: "slices",
            type: "folder",
            children: [{ name: "auth.slice.ts", type: "file" }],
          },
          {
            name: "types",
            type: "folder",
            children: [{ name: "store.types.ts", type: "file" }],
          },
          {
            name: "utils",
            type: "folder",
            children: [
              { name: "base-query-configurations.ts", type: "file" },
              { name: "storage.ts", type: "file" },
              { name: "store-configuration.ts", type: "file" },
            ],
          },
          { name: "store.ts", type: "file" },
        ],
      },
      {
        name: "utils",
        type: "folder",
        children: [
          {
            name: "queryString",
            type: "folder",
            children: [{ name: "generateQueryString.ts", type: "file" }],
          },
        ],
      },
      { name: "index.css", type: "file" },
      { name: "main.tsx", type: "file" },
      { name: "vite-env.d.ts", type: "file" },
    ],
  },
];

function createStructure(base: string, items: FileOrFolder[]) {
  for (const item of items) {
    const fullPath = join(base, item.name);
    if (item.type === "folder") {
      mkdirSync(fullPath, { recursive: true });
      if (item.children) createStructure(fullPath, item.children);
    } else {
      writeFileSync(fullPath, "// placeholder");
    }
  }
}

createStructure(".", structure);
console.log("✅ Folder structure created.");
