import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>NexaERP Maroc</h1>
      <p>ERP SaaS Cloud 100% marocain — socle initial prêt pour GitHub et Railway.</p>
      <div style={{ marginTop: 16 }}>
        <Link href="/dashboard">Accéder au dashboard</Link>
      </div>
    </main>
  );
}
