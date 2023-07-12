import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import { GetServerSidePropsContext } from 'next';
import GoogleLogin from './components/GoogleLogin';
import { useRouter } from 'next/router';

export const Profile = () => {
  const {data: session, status} = useSession();
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/account');
  };

  if (status === 'authenticated') {
    return (
      <button onClick={handleButtonClick}>
        <img src={session.user?.image ?? ''} alt="" className='rounded-full w-8 h-8' />
      </button>
    )
  } else {
    return (
      <img></img>
    )
  }
}

const Account = () => {
  const {data: session, status} = useSession();
  if (status === 'authenticated') {
    return (
      <div>
        <p>Welcome, {session.user?.name}</p>
        <Profile />
        <GoogleLogin session={session}/>
      </div>
    )
  } else {
    return (
      <p>not signed in</p>
    )
  }
}
export default Account

export const getServerSideProps = async(context:GetServerSidePropsContext) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login'
      }
    }
  }
    return {
      props: {session}
    }
}