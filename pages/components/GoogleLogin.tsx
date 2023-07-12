import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function GoogleLogin ({ session }: {session: any}) {
  const router = useRouter()

  const handleLogin = () => {
    signIn("google")
  }
  const SignOut = () => {
    return (
      <button onClick={() => signOut()} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
        Signout
      </button>
    )
  }
  const SignIn = () => {
    return (
      <button onClick={handleLogin} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
        Sign in with Google
      </button>
      )
  }

  return (
    <div className="my-2">
      {session ? (
        <SignOut />
      ) : (
        <SignIn />
      )}
    </div>
  );
};

