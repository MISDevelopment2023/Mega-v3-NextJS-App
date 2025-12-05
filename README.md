# MegaTech Trackers

A modern Next.js application for viewing Grafana dashboards with a clean sidebar and topbar interface.

## Features

- 🎨 Modern, responsive UI with Tailwind CSS
- 📊 Sidebar with report list navigation
- 🔐 Topbar with logout functionality
- 📈 Grafana dashboard embedding
- 🎯 TypeScript for type safety
- ⚡ Next.js 14 with App Router

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Grafana Embed URLs

### Step 1: Get Your Grafana Embed URL

1. Open your Grafana dashboard in a web browser
2. Click on the **Share** button (usually in the top-right corner)
3. Select the **Embed** tab
4. Copy the iframe `src` URL from the embed code

**Example Grafana embed URL format:**
```
https://your-grafana-instance.com/d-solo/YOUR_DASHBOARD_ID/dashboard-name?orgId=1&refresh=30s&theme=light&panelId=2
```

### Step 2: Configure Reports

Open `lib/reports.ts` and update the reports array with your Grafana embed URLs:

```typescript
export const reports: Report[] = [
  {
    id: 'dashboard-1',
    name: 'System Overview',
    grafanaUrl: 'https://your-grafana-instance.com/d-solo/YOUR_DASHBOARD_ID/system-overview?orgId=1&refresh=30s',
    description: 'Overall system performance metrics',
  },
  {
    id: 'dashboard-2',
    name: 'Server Metrics',
    grafanaUrl: 'https://your-grafana-instance.com/d-solo/YOUR_DASHBOARD_ID/server-metrics?orgId=1&refresh=30s',
    description: 'Server performance and resource usage',
  },
  // Add more reports...
];
```

### Step 3: Grafana Embed URL Parameters

You can customize your Grafana embed URLs with various parameters:

- `orgId=1` - Organization ID
- `refresh=30s` - Auto-refresh interval (e.g., 30s, 1m, 5m)
- `theme=light` or `theme=dark` - Dashboard theme
- `kiosk=tv` - Kiosk mode (fullscreen)
- `autofitpanels` - Auto-fit panels to screen
- `from=now-6h` - Time range start
- `to=now` - Time range end
- `panelId=2` - Show specific panel only

**Full example with multiple parameters:**
```
https://your-grafana-instance.com/d-solo/YOUR_DASHBOARD_ID/dashboard-name?orgId=1&refresh=30s&theme=dark&kiosk=tv&autofitpanels&from=now-24h&to=now
```

### Step 4: Authentication (if required)

If your Grafana instance requires authentication, you have several options:

#### Option A: Public/Anonymous Access
Configure Grafana to allow anonymous access for the specific dashboard.

#### Option B: API Key Authentication
Add an API key to the URL:
```
https://your-grafana-instance.com/d-solo/YOUR_DASHBOARD_ID/dashboard-name?auth=YOUR_API_KEY
```

#### Option C: Proxy Authentication
Set up a proxy server that handles authentication and serves the Grafana content.

#### Option D: Grafana Signed URLs
Use Grafana's signed URL feature for secure embedding:
```
https://your-grafana-instance.com/d-solo/YOUR_DASHBOARD_ID/dashboard-name?orgId=1&signature=YOUR_SIGNATURE&timestamp=YOUR_TIMESTAMP
```

### Step 5: Testing

1. Start the development server
2. Click on a report in the sidebar
3. The Grafana dashboard should load in the main content area

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── DashboardLayout.tsx  # Main layout component
│   ├── Sidebar.tsx          # Sidebar component
│   └── Topbar.tsx           # Topbar component
├── lib/
│   └── reports.ts           # Reports configuration
├── types/
│   └── report.ts            # TypeScript types
└── README.md                # This file
```

## Customization

### Adding More Reports

Edit `lib/reports.ts` and add new report objects to the `reports` array:

```typescript
{
  id: 'unique-report-id',
  name: 'Report Display Name',
  grafanaUrl: 'https://your-grafana-url-here',
  description: 'Optional description',
}
```

### Styling

The application uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles and custom classes

### Logout Functionality

The logout button is in `components/Topbar.tsx`. Customize the `handleLogout` function in `components/DashboardLayout.tsx` to implement your authentication logic.

## Building for Production

1. Build the application:
```bash
npm run build
# or
yarn build
```

2. Start the production server:
```bash
npm start
# or
yarn start
```

## Troubleshooting

### Grafana Dashboard Not Loading

1. **Check if the URL is correct**: Verify the embed URL works when accessed directly in a browser
2. **CORS Issues**: Ensure your Grafana instance allows embedding from your domain
3. **Authentication**: Make sure authentication is properly configured
4. **Mixed Content**: Use HTTPS for both your app and Grafana instance

### CORS Configuration in Grafana

If you encounter CORS errors, configure Grafana's `allow_embedding` setting in `grafana.ini`:

```ini
[security]
allow_embedding = true
```

### Iframe Not Rendering

Check your browser console for errors. Ensure:
- The Grafana URL is accessible
- Authentication is not blocking the request
- CSP (Content Security Policy) headers allow iframes

## Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_GRAFANA_BASE_URL=https://your-grafana-instance.com
```

Then update `lib/reports.ts` to use environment variables if needed.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please check:
- Grafana Documentation: https://grafana.com/docs/
- Next.js Documentation: https://nextjs.org/docs

