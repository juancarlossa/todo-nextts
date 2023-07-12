import '../styles.css';
import { AppProps } from 'next/app';
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { SessionProvider } from 'next-auth/react';
import { connectDatabase } from '@/lib/db';
import Layout from './components/layout';
import { useState } from 'react';


export default function App({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  const [idioma, setIdioma] = useState('en');
  const [darkMode, setDarkMode] = useState('dark');
  
  return (
    <SessionProvider>
      <Layout idioma={idioma} setIdioma={setIdioma} darkMode={darkMode} setDarkMode={setDarkMode}>
        <Component {...pageProps} idioma={idioma} setIdioma={setIdioma} darkMode={darkMode} />
      </Layout>
    </SessionProvider>
  );
}