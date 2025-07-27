import { CssBaseline } from '@repo/mui/CssBaseLine';
import { DatadogInit } from '../components/DatadogInit.tsx';
import { MuiProvider } from '../components/MuiProvider.tsx';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={'anonymous'} />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
        />
        <title>1000 Buddha Library Tools</title>
      </head>
      <DatadogInit />
      <CssBaseline />
      <body>
        <MuiProvider>{children}</MuiProvider>
      </body>
    </html>
  );
}
