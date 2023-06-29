import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function getServerSideProps(context : any) {
 
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

const Notifications = () => {
  return ( 
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed />
    </>
   );
}
 
export default Notifications;