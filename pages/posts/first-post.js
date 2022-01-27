import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>Mi primer post</title>
      </Head>

      <h1>Primer Post</h1>
      <h2>
        <Image
          src="/images/profile.jpg"
          height={144}
          width={144}
          alt="Robertico"
        />
        <Link href="/">
          <a>Vuelve al home</a>
        </Link>
      </h2>
    </Layout>
  );
}
