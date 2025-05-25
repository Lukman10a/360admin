# Environment Setup Guide

## API Configuration

This project is designed to work both with and without a backend API. The axios setup automatically detects the environment and handles errors gracefully.

### Development Mode (Default)

By default, the application runs in development mode with mock data:

- ✅ No console errors from failed API calls
- ✅ Mock data provides realistic functionality
- ✅ All features work without a backend
- ✅ React Query hooks function normally

### Connecting to Real API

To connect to a real backend API:

1. Create a `.env.local` file in the project root:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

2. Replace with your actual API URL:
```bash
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
```

3. Restart the development server:
```bash
npm run dev
```

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `undefined` | No |
| `NODE_ENV` | Environment mode | `development` | Auto-set |

## API Integration Features

### Automatic Fallback
- When API is not configured: Uses mock data
- When API calls fail: Falls back to mock data
- Seamless transition between mock and real data

### Error Handling
- Network errors are handled gracefully
- Console errors are minimized in development
- User-friendly error messages in UI

### Mock Data
- Realistic data for all features
- Supports pagination
- Simulates API delays
- Maintains state during session

## Console Error Prevention

The axios client is configured to:

1. **Detect Environment**: Checks if `NEXT_PUBLIC_API_BASE_URL` is set
2. **Conditional Logging**: Only logs API errors when API is expected
3. **Graceful Fallback**: Uses mock data when API is unavailable
4. **Reduced Noise**: Minimizes console errors in development

## Testing API Integration

1. **Mock Mode**: Default - no environment variables needed
2. **API Mode**: Set `NEXT_PUBLIC_API_BASE_URL` to test real API
3. **Hybrid Mode**: API calls fall back to mock data on errors

## Troubleshooting

### Console Errors
If you see console errors:
- Check if `NEXT_PUBLIC_API_BASE_URL` is set correctly
- Verify your API server is running
- Check network connectivity

### Mock Data Not Working
- Ensure you're in development mode
- Check that `NEXT_PUBLIC_API_BASE_URL` is not set
- Restart the development server

### API Calls Failing
- Verify API server is running on the specified URL
- Check CORS configuration on your API
- Ensure API endpoints match the expected format 