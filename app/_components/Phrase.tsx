/**
 * Japanese may break between any two characters, which strands single
 * characters in narrow boxes and captions. Write `|` at the acceptable break
 * points and each piece is set as an unbreakable inline block:
 * `'IFRSだけの|調整仕訳'` wraps only between the two pieces.
 */
export default function Phrase({ text }: { text: string }) {
  return (
    <>
      {text.split('|').map((part, i) => (
        <span key={i} className="inline-block">{part}</span>
      ))}
    </>
  );
}
