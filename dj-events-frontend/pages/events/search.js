import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function Search({ events }) {
  const router = useRouter();

  return (
    <Layout>
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.lenght === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = `filters[$or][0][name][$contains]=${term}&filters[$or][1][performers][$contains]=${term}&filters[$or][2][description][$contains]=${term}&filters[$or][3][venue][$contains]=${term}`;
  const res = await fetch(`${API_URL}/events?populate=*&${query}`);

  const events = await res.json();

  return {
    props: { events: events.data },
  };
}
