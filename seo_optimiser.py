import os
import glob
from bs4 import BeautifulSoup
import re

SITE_URL = "https://gc.fynn.qzz.io"

def get_page_info(filepath, soup):
    # Try to find a title
    title_tag = soup.find('title')
    title = title_tag.text if title_tag else ""
    
    # Try to find the first H1 for a description
    h1_tag = soup.find('h1')
    h1_text = h1_tag.text.strip() if h1_tag else ""
    
    # Fallback title if empty
    if not title:
        basename = os.path.basename(os.path.dirname(filepath))
        if basename in ('En', 'De', '.'):
            basename = "Home"
        title = f"CHIRPSS - {basename}"
        
    # Generate a description
    desc = h1_text
    if not desc:
        desc = "Play free social deduplication and party games with your friends online on CHIRPSS!"
    else:
        desc = f"Play {desc} on CHIRPSS. Fun party games for you and your friends for free online!"
        
    # Clean up description
    desc = re.sub(r'\s+', ' ', desc).strip()
    if len(desc) > 160:
        desc = desc[:157] + "..."
        
    # Generate canonical URL
    rel_path = filepath
    if rel_path.endswith('index.html'):
        rel_path = rel_path[:-10]
    canonical_url = f"{SITE_URL}/{rel_path}"

    return title, desc, canonical_url

def add_meta(soup, head, tag_name, attrs):
    # Check if exists
    existing = None
    if tag_name == 'meta':
        if 'name' in attrs:
            existing = head.find('meta', attrs={'name': attrs['name']})
        elif 'property' in attrs:
            existing = head.find('meta', attrs={'property': attrs['property']})
    elif tag_name == 'link':
        existing = head.find('link', attrs={'rel': attrs.get('rel')})
        
    if not existing:
        new_tag = soup.new_tag(tag_name)
        for k, v in attrs.items():
            new_tag[k] = v
        head.append(new_tag)
        head.append("\n")

for filepath in glob.glob('**/*.html', recursive=True):
    print(f"Processing {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    soup = BeautifulSoup(content, 'html.parser')
    
    # Determine language
    lang = "en"
    if filepath.startswith("De/"):
        lang = "de"
    elif filepath.startswith("En/"):
        lang = "en"
        
    html_tag = soup.find('html')
    if html_tag and not html_tag.has_attr('lang'):
        html_tag['lang'] = lang
        
    head = soup.find('head')
    if not head:
        continue
        
    title, desc, canonical_url = get_page_info(filepath, soup)
    
    if "de" in lang:
        desc = desc.replace("Play ", "Spiele ").replace(" on CHIRPSS. Fun party games for you and your friends for free online!", " auf CHIRPSS. Lustige Partyspiele für dich und deine Freunde online!")
        desc = desc.replace("Play free social deduplication and party games with your friends online on CHIRPSS!", "Spiele kostenlose Social Deduplication- und Partyspiele mit deinen Freunden online auf CHIRPSS!")
        
    # Title tag validation
    if not soup.find('title'):
        title_tag = soup.new_tag('title')
        title_tag.string = title
        head.insert(0, title_tag)
        head.insert(1, "\n")
        
    # Add meta tags
    add_meta(soup, head, 'meta', {'name': 'description', 'content': desc})
    keywords = "party games, online games, multiplayer games, CHIRPSS, social games, browser games, free games"
    if "de" in lang:
        keywords = "Handyspiele, Online-Spiele, Multiplayer-Spiele, CHIRPSS, Social Games, Browserspiele, kostenlose Spiele"
    add_meta(soup, head, 'meta', {'name': 'keywords', 'content': keywords})
    
    add_meta(soup, head, 'meta', {'property': 'og:title', 'content': title})
    add_meta(soup, head, 'meta', {'property': 'og:description', 'content': desc})
    add_meta(soup, head, 'meta', {'property': 'og:type', 'content': 'website'})
    add_meta(soup, head, 'meta', {'property': 'og:url', 'content': canonical_url})
    
    add_meta(soup, head, 'meta', {'name': 'twitter:card', 'content': 'summary_large_image'})
    add_meta(soup, head, 'meta', {'name': 'twitter:title', 'content': title})
    add_meta(soup, head, 'meta', {'name': 'twitter:description', 'content': desc})
    
    add_meta(soup, head, 'link', {'rel': 'canonical', 'href': canonical_url})
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(str(soup))
