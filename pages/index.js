import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Home() {

  const router = useRouter();
  const href = "/login";

  useEffect(()=>{
    router.push(href);
  },[]);

  return (
    <p>Redirecting...</p>
  )
}
