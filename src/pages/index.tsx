import Head from 'next/head';
import { Geist, Geist_Mono } from 'next/font/google';
import MainPage from 'src/components/MainPage';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>GitHub Search App</title>
        <meta
          name='description'
          content='Search for Github Repos and Users'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/github-icon.svg'
        />
      </Head>
      <main className={`${geistSans.variable} ${geistMono.variable}`}>
        <MainPage />
      </main>
    </>
  );
}
