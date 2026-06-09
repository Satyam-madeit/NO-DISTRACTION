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
        self.top_frame = ctk.CTkFrame(self)
        self.top_frame.pack(fill="x", padx=20, pady=20)
        self.title_label = ctk.CTkLabel(self.top_frame, text="🎯 Focus Mode")
        self.title_label.pack(side="left", padx=10, pady=10)
        self.top_switch = ctk.CTkSwitch(self.top_frame, text="Enable Focus Mode", command=self.toggle_focus_mode)
        self.top_switch.pack(side="right", padx=10, pady=10)
        self.scroll_frame = ctk.CTkScrollableFrame(self, label_text="Blocked Sites")
        self.scroll_frame.pack(fill="both", expand=True, padx=20, pady=10)
        self.bottom_frame = ctk.CTkFrame(self)
        self.bottom_frame.pack(fill="x", padx=20, pady=10)
        self.site_entry = ctk.CTkEntry(self.bottom_frame, placeholder_text="Enter site url...")
        self.site_entry.pack(side="left", fill="x", expand=True, padx=10, pady=10)
        self.add_button = ctk.CTkButton(self.bottom_frame, text="Add", width=60, command=self.add_site)
        self.add_button.pack(side="right", padx=10, pady=10)
        self.mainloop()
    
    def toggle_focus_mode(self):
        pass

    def add_site(self):
        pass

if __name__ == "__main__":
    app = App()