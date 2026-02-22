This document explains how API failures (e.g., DHL rate service downtime) are handled
and how the application is optimized for slow 3G connections in emerging markets.

--API Error Handling Strategy (DHL Service Down)--

External shipping APIs may fail due to:

- Service downtime
- Network instability
- Timeout issues

Centralized API Layer

All API calls are handled through a centralized service layer
(e.g., Axios instance or RTK Query baseQuery).

- Normalize errors
- Handle network failures
- Add retry logic if using rtk query

Example approach:

- Use Axios interceptors to capture network errors.
- Return standardized error objects.

--Bundle Optimization for Slow 3G (Emerging Markets)--

Code Splitting

- Lazy load heavy components
- Load shipping table only when needed
- Use React.lazy / dynamic imports

Tree Shaking

- Import only required MUI components
- Avoid importing entire libraries
- Remove unused utilities

Reduce Third-Party Dependencies

- Avoid heavy libraries when native JS is sufficient
- Prefer lightweight alternatives

Image Optimization

- Use WebP format
- Lazy load images
- Provide responsive sizes

Caching Strategy

- Enable HTTP caching for static assets
- Cache shipping rates with short TTL
- Caching data using react query
- Use service workers for asset caching

Avoid Unnecessary Re-renders

- Use React.memo
- Memoize expensive calculations
- Avoid excessive global state usage



------ IN performance we can use something called Optimistic ui, You update the UI immediately assuming the API call will succeed, instead of waiting for the network response if it failed rollback again ------