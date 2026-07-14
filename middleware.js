// Vercel Edge Middleware — framework-agnostic, works on this zero-build static site
// without needing a package.json since it only uses standard Web Request/Response APIs.
//
// Social-media link-preview bots (Facebook, X, LinkedIn, Slack, WhatsApp, ...) don't
// execute JavaScript, so blog-post.html's client-rendered per-post <title>/OG tags never
// reach them. For those user agents only, fetch the post from the Firestore REST API
// (public read, same rule engine as the browser SDK) and return a small HTML stub with
// the correct meta tags. Every other request (real browsers, Googlebot, which does
// execute JS) falls through untouched to the normal static page + vercel.json rewrite.

export const config = {
  matcher: ['/blog/:slug*'],
};

const BOT_UA_REGEX =
  /facebookexternalhit|Twitterbot|LinkedInBot|Slackbot|WhatsApp|TelegramBot|Discordbot|SkypeUriPreview|Pinterest|redditbot|Applebot|vkShare/i;

const PROJECT_ID = 'dotko-b2543';
const SITE_URL = 'https://dotko.in';
const FALLBACK_IMAGE = `${SITE_URL}/assets/icon.png`;

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function fieldValue(fields, name) {
  const f = fields && fields[name];
  if (!f) return undefined;
  return f.stringValue;
}

export default async function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  if (!BOT_UA_REGEX.test(userAgent)) return; // real visitors / Googlebot: fall through untouched

  const url = new URL(request.url);
  const slug = url.pathname.split('/').filter(Boolean).pop();
  if (!slug || slug === 'blog') return;

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/blogs/${slug}`
    );
    if (!res.ok) return; // draft/missing post — fall through to the default page

    const docJson = await res.json();
    const fields = docJson.fields || {};
    if (fieldValue(fields, 'status') !== 'published') return;

    const title = fieldValue(fields, 'title') || 'Dotko.in Blog';
    const excerpt = fieldValue(fields, 'excerpt') || '';
    const cover = fieldValue(fields, 'coverImageUrl') || FALLBACK_IMAGE;
    const canonicalUrl = `${SITE_URL}/blog/${slug}`;

    const html = `<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8">
<title>${escapeHtml(title)} | Dotko.in Blog</title>
<meta name="description" content="${escapeHtml(excerpt)}">
<meta property="og:type" content="article">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(excerpt)}">
<meta property="og:image" content="${escapeHtml(cover)}">
<meta property="og:url" content="${canonicalUrl}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(excerpt)}">
<meta name="twitter:image" content="${escapeHtml(cover)}">
</head><body></body></html>`;

    return new Response(html, {
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  } catch {
    return; // fail open — worst case a bot sees the generic static page
  }
}
