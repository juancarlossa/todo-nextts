import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import App from './index';

interface UserPageProps {
  user: string;
}

const UserPage: React.FC<UserPageProps> = ({ user }) => {
  //const { data: session, status } = useSession();
  const router = useRouter();
  //console.log(user)
  //console.log(session?.user?.email)
  if (router.isFallback) {
    return <p>Loading...</p>;
  }
  //if (status === 'loading') {
  //if (status === 'authenticated' && session.user?.email == user) {
    return (
      <>
        <h1>Página del usuario {user}</h1>
        <App userId={user}/>
        {/* Renderizar contenido específico del usuario */}
      </>
    )

  // Redireccionar al usuario a la página de inicio de sesión
  //router.replace('/login');
};

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);
    console.log('This is context' + context.params?.user)
    if (!session || session.user?.name !== context.params?.user) {
      
    return {
      redirect: {
        destination: '/account', // Redireccionar al usuario a la página de inicio de sesión
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: session?.user?.email || '',
    },
  };
};

export default UserPage;
