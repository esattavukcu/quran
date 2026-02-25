interface TranslationPairProps {
  diyanet: string;
  ozturk: string;
}

export default function TranslationPair({ diyanet, ozturk }: TranslationPairProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
      <div className="bg-card-bg border border-card-border rounded-lg p-3">
        <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-1.5">
          Diyanet
        </span>
        <p className="text-sm text-foreground/80 leading-relaxed">{diyanet}</p>
      </div>
      <div className="bg-card-bg border border-card-border rounded-lg p-3">
        <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-1.5">
          Yaşar Nuri
        </span>
        <p className="text-sm text-foreground/80 leading-relaxed">{ozturk}</p>
      </div>
    </div>
  );
}
