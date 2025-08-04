import Head from 'next/head';
import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import styles from 'src/styles/Home.module.css';

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
          content='Search for Github Repo and users'
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
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <h1>hi</h1>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    </>
  );
}
