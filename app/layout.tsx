import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '../context/AuthContext';
import ClientWrapper from '../components/animations/homepage/ClientWrapper';
import MessagingWrapper from '../components/MessagingWrapper';

export const metadata = {
  title: 'DZINR App',
  description: 'Next.js Fullstack App',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="overflow-hidden">
      <body
        className="
          bg-gray-50 dark:bg-[#0a0a0a]
          h-screen
          w-screen
          overflow-hidden
        "
      >

        <AuthProvider>

          <ClientWrapper>

            {/* MAIN APP VIEWPORT */}
            <main
              className="
                w-full
                h-full
                overflow-hidden
                relative
              "
            >
              {children}
            </main>

          </ClientWrapper>
          <MessagingWrapper />

        </AuthProvider>
        

      </body>
    </html>
  );
}
