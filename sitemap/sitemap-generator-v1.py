import urllib.request
import urllib.parse
import html.parser
import sys
import os
import datetime
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

class LinkParser(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = set()

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            for attr, value in attrs:
                if attr == "href" and value:
                    self.links.add(value)

def normalize_url(base, link):
    return urllib.parse.urljoin(base, link.split('#')[0])

def is_internal(url, base_netloc):
    return urllib.parse.urlparse(url).netloc == base_netloc

def priority_and_freq(url, base_url):
    if url == base_url or url == base_url + "/":
        return "1.0", "monthly"
    if any(x in url for x in ["/about", "/contact", "/services", "/academy", "/courses"]):
        return "0.8", "monthly"
    if any(x in url for x in ["/blog", "/post"]):
        return "0.6", "yearly"
    return "0.5", "yearly"

def crawl(base_url, max_pages=1000):
    visited = set()
    to_visit = [base_url]
    netloc = urllib.parse.urlparse(base_url).netloc

    while to_visit and len(visited) < max_pages:
        current = to_visit.pop(0)
        if current in visited:
            continue

        try:
            req = urllib.request.Request(current, headers={"User-Agent": "Mozilla/5.0"})
            response = urllib.request.urlopen(req, timeout=10)
            content_type = response.headers.get("Content-Type", "")

            if "text/html" not in content_type:
                continue

            visited.add(current)

            parser = LinkParser()
            html_content = response.read().decode("utf-8", errors="ignore")
            parser.feed(html_content)

            for link in parser.links:
                full_url = normalize_url(current, link)
                if is_internal(full_url, netloc):
                    to_visit.append(full_url)

        except Exception:
            continue

    return visited

def generate_sitemap(urls, base_url):
    today = datetime.date.today().isoformat()
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]

    for url in sorted(urls):
        priority, freq = priority_and_freq(url, base_url)
        lines.extend([
            "  <url>",
            f"    <loc>{url}</loc>",
            f"    <lastmod>{today}</lastmod>",
            f"    <changefreq>{freq}</changefreq>",
            f"    <priority>{priority}</priority>",
            "  </url>"
        ])

    lines.append("</urlset>")
    return "\n".join(lines)

if __name__ == "__main__":
    base_url = input("Enter website URL (e.g. https://example.com): ").strip()

    if not base_url.startswith("http"):
        print("Invalid URL")
        sys.exit(1)

    print("Crawling website...")
    urls = crawl(base_url)

    print(f"Found {len(urls)} URLs")
    sitemap = generate_sitemap(urls, base_url)

    with open("sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap)

    print("sitemap.xml generated successfully")
