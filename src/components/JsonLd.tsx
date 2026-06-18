/**
 * Renders a JSON-LD structured-data block. Server component. The data is
 * author-controlled, so dangerouslySetInnerHTML is safe here.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
