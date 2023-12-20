import './globals.css';
import localFont from 'next/font/local';

export const metadata = {
  title: 'The Everything Bagel Experience',
  description:
    'An immersive experience inspired by Everything Everywhere All At Once crafted with React Three Fiber',
  siteName: 'The Everything Bagel Experience',
  icons: {
    icon: '/icon.ico',
  },
  openGraph: {
    title: 'The Everything Bagel Experience',
    description:
      'An immersive experience inspired by Everything Everywhere All At Once crafted with React Three Fiber',
    site_name: 'The Everything Bagel Experience',
    images: [
      {
        url: 'https://i.ibb.co/hcP7RSZ/bagel-og.jpg',
        width: 1800,
        height: 945,
        alt: 'The Everything Bagel Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Everything Bagel Experience',
    description:
      'An immersive experience inspired by Everything Everywhere All At Once crafted with React Three Fiber',
    creator: '@thepalminister',
    images: ['https://i.ibb.co/hcP7RSZ/bagel-og.jpg'],
  },
  locale: 'en_US',
  type: 'website',
};

const baskerville = localFont({
  src: './fonts/Baskerville-Old-Face.ttf',
  variable: '--font-baskerville',
});
const extenda = localFont({
  src: './fonts/Extenda-Variable-trial.ttf',
  variable: '--font-extenda',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${baskerville.variable} ${extenda.variable}`}>
        {children}
      </body>
    </html>
  );
}
