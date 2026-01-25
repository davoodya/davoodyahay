import urllib.request
import urllib.parse
import html.parser
import sys
import os
import datetime
import ssl
from collections import deque

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
    """
    تبدیل لینک به URL کامل و حذف fragment
    """
    link = link.split('#')[0].strip()
    if not link:
        return None
    return urllib.parse.urljoin(base, link)

def is_internal(url, base_netloc):
    """
    بررسی داخلی بودن لینک
    """
    try:
        return urllib.parse.urlparse(url).netloc == base_netloc
    except:
        return False

def priority_and_freq(url, base_url):
    """
    تعیین priority و changefreq بهینه
    """
    # صفحه اصلی
    if url.rstrip("/") == base_url.rstrip("/"):
        return "1.0", "weekly"

    # صفحات کلیدی
    key_pages = ["/about", "/contact", "/services", "/academy", "/courses", "/pages/articles.html", "/pages/courses.html"]
    if any(url.endswith(p) or p in url for p in key_pages):
        return "0.8", "monthly"

    # صفحات جزئی یا ابزارها
    return "0.7", "yearly"

def crawl(base_url, max_pages=5000):
    """
    Crawl عمقی سایت بدون محدودیت segment
    """
    visited = set()
    to_visit = deque([base_url])
    netloc = urllib.parse.urlparse(base_url).netloc

    while to_visit and len(visited) < max_pages:
        current = to_visit.popleft()
        if current in visited:
            continue

        try:
            req = urllib.request.Request(current, headers={"User-Agent": "Mozilla/5.0"})
            response = urllib.request.urlopen(req, timeout=10)
            content_type = response.headers.get("Content-Type", "")

            if "text/html" not in content_type:
                visited.add(current)
                continue

            html_content = response.read().decode("utf-8", errors="ignore")
            parser = LinkParser()
            parser.feed(html_content)

            visited.add(current)

            for link in parser.links:
                full_url = normalize_url(current, link)
                if full_url and is_internal(full_url, netloc) and full_url not in visited and full_url not in to_visit:
                    to_visit.append(full_url)

        except Exception as e:
            # خطاها را چاپ نمی‌کنیم تا Crawl ادامه یابد
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
        # lastmod فقط برای صفحات مهم و تغییرپذیر
        if priority in ["1.0", "0.8"]:
            lines.extend([
                "  <url>",
                f"    <loc>{url}</loc>",
                f"    <lastmod>{today}</lastmod>",
                f"    <changefreq>{freq}</changefreq>",
                f"    <priority>{priority}</priority>",
                "  </url>"
            ])
        else:
            lines.extend([
                "  <url>",
                f"    <loc>{url}</loc>",
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

    print("Crawling website deeply...")
    urls = crawl(base_url)
    print(f"Found {len(urls)} URLs")

    sitemap = generate_sitemap(urls, base_url)
    with open("sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap)

    print("sitemap.xml generated successfully")
