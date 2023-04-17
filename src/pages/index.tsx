import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <section style={{height: '100%', width: '100%'}}>
      <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
        <div style={{height: '15rem', width: '35em', backgroundColor: 'red'}}>1</div>
        <div style={{height: '15rem', width: '35em', backgroundColor: 'greenyellow'}}>2</div>
        <div style={{height: '15rem', width: '35em', backgroundColor: 'blue'}}>3</div>
      </div>
      <div style={{height: '5rem', width: '100%', backgroundColor: 'brown'}}></div>
      <div></div>
    </section>
  );
}
