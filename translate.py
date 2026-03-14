import os
import glob
from bs4 import BeautifulSoup
from deep_translator import GoogleTranslator
import time

translator = GoogleTranslator(source='en', target='de')

files = glob.glob('De/**/*.html', recursive=True)
for f in files:
    print(f"Translating {f}...")
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    
    for text_node in soup.find_all(string=True):
        if text_node.parent.name not in ['script', 'style', 'meta'] and text_node.strip():
            # Quick check to skip mostly empty or numeric nodes
            text = text_node.strip()
            if len(text) > 1 and not text.isnumeric():
                try:
                    translated = translator.translate(text)
                    text_node.replace_with(text_node.replace(text, translated))
                except Exception as e:
                    print(f"Could not translate: {text}")

    with open(f, 'w', encoding='utf-8') as file:
        file.write(str(soup))

