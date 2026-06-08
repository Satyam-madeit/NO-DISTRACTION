import requests
import customtkinter as ctk
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
    
ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("blue")

class App(ctk.CTk):
    def __init__(self):
        super().__init__()

        # Configure the window
        self.title("Focus Mode")
        self.geometry("500x700")
        self.mainloop()
if __name__ == "__main__":
    app = App()