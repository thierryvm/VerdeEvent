import { NextResponse } from 'next/server';

export function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://verdeevent.be/sitemap.xml
Host: https://verdeevent.be`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
