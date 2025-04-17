## Advanced Patterns

### FeatureFlag System

Example

```
// features/content-generation/bulk-article/index.ts
import { featureFlags } from '@/config';

export const BulkGenerator = featureFlags.bulkEnabled
  ? lazy(() => import('./components/BulkGenerator'))
  : () => <FeatureDisabled />;
```

### Lazy-loaded Components

Example

```
// features/content-generation/bulk-article/index.ts
import { lazy } from 'react';

export const BulkPreview = lazy(() => import('./components/BulkPreview'));

```

### Re-exporting Types from Submodules

```
// features/content-generation/bulk-article/types/index.ts
export type { BulkConfig } from './bulkTypes';
export type { GenerationStatus } from './enums';
export type { ContentBatch } from './batchTypes';
```

## Best Practices

### Selective Exporting

```
// Only expose public API surface
export { PublicComponent } from './components/PublicComponent';
// Internal component NOT exported
// import { InternalHelper } from './components/InternalHelper';

```

### Type Export Groups

```

// Group related types
export type {
  BulkConfig,
  ContentTemplate,
  OutputFormat
} from './types/configTypes';

export type {
  GenerationResult,
  QualityMetrics
} from './types/resultTypes';

```

### Versioned Exports

```

// For future-proofing
import { BulkGeneratorV2 } from './v2/components';

export const BulkGenerator = process.env.REACT_APP_BULK_VERSION === 'v2'
  ? BulkGeneratorV2
  : require('./v1/components').BulkGeneratorV1;

```

### Route Configuration

Example

```
const router = createBrowserRouter(
  routes.map(route => ({
    ...route,
    element: (
      <ErrorBoundary>
        <route.element />
      </ErrorBoundary>
    )
  }))
);

import { MainLayout } from '@/layouts/MainLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';

export const routes = [
  {
    path: '/',
    element: MainLayout,
    children: [
      { path: '/', element: lazy(() => import('@/pages/public/HomePage')) },
      { path: '/pricing', element: lazy(() => import('@/pages/public/PricingPage')) }
    ]
  },
  {
    path: '/dashboard',
    element: DashboardLayout,
    children: [
      { path: 'content', element: lazy(() => import('@/pages/private/ContentPage')) },
      { path: 'analytics', element: lazy(() => import('@/pages/private/AnalyticsPage')) }
    ]
  }
];
```

### Page Metadata Management

Example

```
// utils/usePageMetadata.ts
export const usePageMetadata = (title: string, description?: string) => {
  useEffect(() => {
    document.title = `${title} | ${APP_NAME}`;
    meta('description', description || DEFAULT_DESCRIPTION);
  }, [title, description]);
};

// Usage in pages
export default function SeoAnalyzerPage() {
  usePageMetadata('SEO Analyzer', 'Advanced SEO content analysis tools');
  return (...);
}

```

### Error Boundary Integration

Example

```
// components/ErrorBoundary.tsx
export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <ErrorLayout>
      {isRouteErrorResponse(error) ? (
        <h1>{error.status} {error.statusText}</h1>
      ) : (
        <h1>Unexpected Error</h1>
      )}
    </ErrorLayout>
  );
}

```

## Anti-Patterns to Avoid

### Wildcard Exports ❌

Example

```
// features/content-generation/bulk-article/index.ts
export * from './components'; // Avoid - exposes internal structure

```

### Default Exports ❌

Example

```
// components/BulkConfigForm.tsx
export default BulkConfigForm; // Harder to refactor
```

### Circular References ❌

Example

```
// features/content-generation/bulk-article/index.ts
export { ContentPreview } from './components/ContentPreview';
// components/ContentPreview.tsx
import { useBulkGeneration } from '..'; // Circular import

```

## Performance Considerations

### Tree Shaking Optimization

```
// Use named exports for better tree shaking
export { BulkConfigForm } from './components/BulkConfigForm'; ✅
export default from './components/BulkConfigForm'; ❌
```

### Dynamic Imports

```
// features/content-generation/bulk-article/index.ts
export const BulkExporter = {
  HTML: lazy(() => import('./exporters/HTMLExporter')),
  WordPress: lazy(() => import('./exporters/WPExporter'))
};

```
