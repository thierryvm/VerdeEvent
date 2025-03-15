import { organizationSchema } from '@/app/schema';

interface SchemaOrgProps {
  schema?: object;
}

export function SchemaOrg({ schema = organizationSchema }: SchemaOrgProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
