import requests
from PIL import Image, ImageTk
from io import BytesIO

favicon_cache = {} 

def get_favicon(url):
    if url in favicon_cache:
        return favicon_cache[url]  
    try:
        favicon_url = f"https://www.google.com/s2/favicons?domain={url}&sz=32"
        response = requests.get(favicon_url, timeout=5)
        response.raise_for_status()
        image = Image.open(BytesIO(response.content))
        photo = ImageTk.PhotoImage(image)
        favicon_cache[url] = photo  # store it
        return photo
    except Exception as e:
        print(f"Error fetching favicon: {e}")
        return None