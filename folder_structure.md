Affpilot NEW folder structure

```
📦 **src**
├── 📂 app
│   ├── 📂 config
│   │   ├── 📂 content-route
│   │   │   └── 📜 content.route.tsx
│   │   └── 📜 routes.tsx
│   └── 📂 core
│       ├── 📂 route-protection
│       │   └── 📜 AuthGuard.tsx
│       ├── 📜 App.tsx
│       └── 📜 AppProviders.tsx
├── 📂 assets
│   ├── 📂 data
│   │   └── 📜 featureList.ts
│   └── 📜 react.svg
├── 📂 components
│   ├── 📂 credits-card
│   │   └── 📜 SideBarCredits.tsx
│   ├── 📂 header
│   │   └── 📜 Header.tsx
│   ├── 📂 mobile-menu
│   │   └── 📜 MobileMenu.tsx
│   ├── 📂 page-title
│   │   └── 📜 PageTitle.tsx
│   ├── 📂 settings
│   │   └── 📜 ColorPicker.tsx
│   ├── 📂 shared
│   │   ├── 📂 form-badges
│   │   │   └── 📜 FormBadges.tsx
│   │   ├── 📂 inputs
│   │   │   ├── 📜 SelectInput.tsx
│   │   │   └── 📜 SwitchInput.tsx
│   │   └── 📂 submit-button
│   │       └── 📜 SubmitButton.tsx
│   ├── 📂 sidebar
│   │   ├── 📜 Navigation.tsx
│   │   ├── 📜 NavLinks.tsx
│   │   ├── 📜 NestedLink.tsx
│   │   └── 📜 SideBar.tsx
│   ├── 📂 theme
│   │   └── 📜 ThemeToggle.tsx
│   └── 📂 ui
│       ├── 📜 avatar.tsx
│       ├── 📜 badge.tsx
│       ├── 📜 button.tsx
│       ├── 📜 card.tsx
│       ├── 📜 checkbox.tsx
│       ├── 📜 collapsible.tsx
│       ├── 📜 form.tsx
│       ├── 📜 input.tsx
│       ├── 📜 label.tsx
│       ├── 📜 progress.tsx
│       ├── 📜 radio-group.tsx
│       ├── 📜 select.tsx
│       ├── 📜 separator.tsx
│       ├── 📜 sheet.tsx
│       ├── 📜 switch.tsx
│       ├── 📜 tabs.tsx
│       ├── 📜 textarea.tsx
│       └── 📜 tooltip.tsx
├── 📂 features
│   ├── 📂 auth
│   │   ├── 📂 components
│   │   │   ├── 📜 EmailVerificationNotice.tsx
│   │   │   ├── 📜 ForgetPasswordForm.tsx
│   │   │   ├── 📜 LoginForm.tsx
│   │   │   ├── 📜 ResetPasswordForm.tsx
│   │   │   └── 📜 SignUpForm.tsx
│   │   ├── 📂 hooks
│   │   │   └── 📜 useAuth.ts
│   │   ├── 📂 schemas
│   │   │   └── 📜 auth.schemas.ts
│   │   ├── 📂 types
│   │   ├── 📂 utils
│   │   │   └── 📜 passwordIndicator.ts
│   │   └── 📜 index.ts
│   ├── 📂 content-generation
│   │   ├── 📂 shared
│   │   │   ├── 📂 components
│   │   │   │   ├── 📜 AiTitle.tsx
│   │   │   │   ├── 📜 GptVersion.tsx
│   │   │   │   ├── 📜 ImageCredit.tsx
│   │   │   │   ├── 📜 IncludeFAQSchema.tsx
│   │   │   │   ├── 📜 IncludeVideo.tsx
│   │   │   │   ├── 📜 Keywords.tsx
│   │   │   │   ├── 📜 NumberOfFAQs.tsx
│   │   │   │   ├── 📜 PublishDestination.tsx
│   │   │   │   ├── 📜 RealTimeData.tsx
│   │   │   │   ├── 📜 SelectArticleType.tsx
│   │   │   │   ├── 📜 SelectImageSource.tsx
│   │   │   │   ├── 📜 SelectLanguage.tsx
│   │   │   │   ├── 📜 SelectTone.tsx
│   │   │   │   └── 📜 SubHeadings.tsx
│   │   │   └── 📜 index.ts
│   │   └── 📂 write-info-article
│   │       ├── 📂 components
│   │       │   ├── 📜 BulkArticleGenerationForm.tsx
│   │       │   ├── 📜 InputSubHeadingForm.tsx
│   │       │   └── 📜 ShortInfoArticleForm.tsx
│   │       ├── 📂 hooks
│   │       │   └── 📜 useBulkInfoForm.ts
│   │       ├── 📂 schemas
│   │       │   └── 📜 write.info.article.schemas.ts
│   │       └── 📜 index.ts
│   └── 📂 dashboard
│       ├── 📂 content-generation
│       └── 📂 overview
│           ├── 📂 components
│           │   ├── 📜 CreditsCard.tsx
│           │   ├── 📜 RecentActivity.tsx
│           │   ├── 📜 SearchBar.tsx
│           │   ├── 📜 StatsCard.tsx
│           │   ├── 📜 ToolCard.tsx
│           │   ├── 📜 ToolsGrid.tsx
│           │   └── 📜 ToolsTabs.tsx
│           ├── 📂 hooks
│           │   ├── 📜 useActivityFeed.ts
│           │   └── 📜 useFeatureList.ts
│           ├── 📂 types
│           │   └── 📜 activity.types.ts
│           └── 📜 index.ts
├── 📂 hooks
│   └── 📜 useManageQueryParams.ts
├── 📂 lib
│   ├── 📂 images
│   │   └── 📜 importImage.ts
│   ├── 📜 dot.env.ts
│   └── 📜 utils.ts
├── 📂 pages
│   ├── 📂 private
│   │   └── 📂 dashboard
│   │       ├── 📂 content-generation
│   │       │   ├── 📂 bulk-article-generation
│   │       │   │   └── 📜 BulkArticleGeneration.tsx
│   │       │   ├── 📂 input-sub-heading
│   │       │   │   └── 📜 InputSubHeading.tsx
│   │       │   └── 📂 short-info-article
│   │       │       └── 📜 ShortInfoArticle.tsx
│   │       ├── 📂 overview
│   │       │   └── 📜 OverviewPage.tsx
│   │       └── 📜 DashboardLayout.tsx
│   └── 📂 public
│       ├── 📂 email-verfication
│       │   └── 📜 EmailVerificationNoticePage.tsx
│       ├── 📂 forget-password
│       │   └── 📜 ForgetPasswordPage.tsx
│       ├── 📂 login
│       │   └── 📜 LoginPage.tsx
│       ├── 📂 reset-password
│       │   └── 📜 ResetPasswordPage.tsx
│       └── 📂 signup
│           └── 📜 SignupPage.tsx
├── 📂 providers
│   └── 📂 theme-provider
│       ├── 📜 ThemeContext.tsx
│       └── 📜 ThemeProvider.tsx
├── 📂 redux
│   ├── 📂 api
│   │   ├── 📜 auth.api.ts
│   │   ├── 📜 index.ts
│   │   └── 📜 task.api.ts
│   ├── 📂 hooks
│   │   ├── 📜 useAppDispatch.ts
│   │   └── 📜 useAppSelector.ts
│   ├── 📂 slices
│   │   └── 📜 auth.slice.ts
│   ├── 📂 types
│   │   └── 📜 store.types.ts
│   ├── 📂 utils
│   │   ├── 📜 base-query-configurations.ts
│   │   ├── 📜 storage.ts
│   │   └── 📜 store-configuration.ts
│   └── 📜 store.ts
├── 📂 utils
│   └── 📂 query-string
│       └── 📜 generateQueryString.ts
├── 📜 index.css
├── 📜 main.tsx
└── 📜 vite-env.d.ts
```
