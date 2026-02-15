import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '../context/AuthContext';
import ClientWrapper from '../components/animations/homepage/ClientWrapper';
import MessagingWrapper from '../components/MessagingWrapper';

export const metadata = {
  title: 'YapYard',
  description: 'YapYard is a platform for creators to share their work and connect with their audience. Discover, support, and engage with your favorite creators all in one place.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-[#0a0a0a]">
        <AuthProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
          <MessagingWrapper />

        </AuthProvider>
        

      </body>
    </html>
  );
}