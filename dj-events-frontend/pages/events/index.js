import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function Events({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.lenght === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?populate=*&sort=date:asc`);
  const events = await res.json();

  return {
    props: { events: events.data },
    revalidate: 1,
  };
}
