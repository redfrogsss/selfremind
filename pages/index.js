import AuthRedirect from '../components/AuthRedirect';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
const axios = require('axios');

export default function Home() {

  const [cookies, setCookie, removeCookie] = useCookies(['userID']);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/init").then((res) => {
      if (!cookies.userID) {
        router.push("/login");
      } else {
        axios.post("/api/authStatus", { userID: cookies.userID }).then((res) => {
          if (!res.data.authStatus) {
            router.push("/login");
          } else {
            router.push("/home");
          }
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <>
      <p>Redirecting...</p>
    </>
  )
}
