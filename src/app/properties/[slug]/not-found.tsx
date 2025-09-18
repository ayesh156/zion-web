import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">Property Not Found</h1>
          <p className="text-neutral-600 mb-8">The property you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/properties" className="text-primary-600 hover:text-primary-700 font-semibold">
            ← Back to Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
