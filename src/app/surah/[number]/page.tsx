import SurahPageClient from './SurahPageClient';

export function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    number: String(i + 1),
  }));
}

export default function SurahPage({ params }: { params: Promise<{ number: string }> }) {
  return <SurahPageClient params={params} />;
}
