import './globals.css';
import { ReactNode } from 'react';

import { AuthProvider } from '../context/AuthContext';
import ClientWrapper from '../components/animations/homepage/ClientWrapper';
import MessagingWrapper from '../components/Messages/MessagingWrapper';

import LayoutWrapper from '@/components/layout/LayoutWrapper';

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-[#0a0a0a]">

        <AuthProvider>

          <ClientWrapper>

            <LayoutWrapper>
              {children}
            </LayoutWrapper>

          </ClientWrapper>

          <MessagingWrapper />

        </AuthProvider>

      </body>
    </html>
  );
}
