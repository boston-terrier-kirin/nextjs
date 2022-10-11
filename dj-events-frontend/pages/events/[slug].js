import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';

export default function Event(props) {
  const { id } = props.evt;
  const { attributes } = props.evt;
  const imageUrl = attributes.image.data?.attributes.formats.medium.url;

  const deleteEvent = () => {
    console.log('delete');
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(attributes.date).toLocaleDateString('ja-JP')} at{' '}
          {attributes.time}
        </span>
        <h1>{attributes.name}</h1>
        {imageUrl && (
          <div className={styles.image}>
            <Image src={imageUrl} alt="Event" width={960} height={600} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{attributes.performers}</p>
        <h3>Description</h3>
        <p>{attributes.description}</p>
        <h3>Venue: {attributes.venue}</h3>
        <p>{attributes.address}</p>

        <Link href="/events">
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
    `${API_URL}/events?populate=*&filters[slug][$eq]=${slug}`
  );
  const events = await res.json();

  return {
    props: {
      evt: events.data[0],
    },
    revalidate: 1,
  };
}
