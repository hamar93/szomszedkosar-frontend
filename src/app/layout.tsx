import './globals.css';
import SessionWrapper from '@/components/SessionWrapper';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className="flex flex-col min-h-screen">
        <SessionWrapper>
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
