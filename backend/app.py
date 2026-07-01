import json
import os
import sys

import pystray
import webview
from PIL import Image

if __package__ in (None, ""):
    sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.api import FocusApi


def get_base_path():
    """Works both when run as a plain script and when bundled by PyInstaller."""
    if getattr(sys, "frozen", False):
        return sys._MEIPASS

    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def get_frontend_path():
    return os.path.join(get_base_path(), "frontend", "index.html")


def get_icon_path():
    return os.path.join(get_base_path(), "assets", "icon.ico")


class FocusModeApp:
    def __init__(self):
        self.api = FocusApi()
        self.window = None
        self.tray_icon = None
        self.is_quitting = False

    def create_window(self):
        self.window = webview.create_window(
            title="Focus Mode",
            url=get_frontend_path(),
            js_api=self.api,
            width=600,
            height=780,
            resizable=True,
            min_size=(460, 620),
        )
        self.window.events.closing += self.on_window_closing

    def create_tray_icon(self):
        image = Image.open(get_icon_path())
        menu = pystray.Menu(
            pystray.MenuItem("Open Focus Mode", self.show_window, default=True),
            pystray.MenuItem("Quit", self.quit_app),
        )
        self.tray_icon = pystray.Icon("FocusMode", image, "Focus Mode", menu)
        self.tray_icon.run_detached()

    def show_window(self, icon=None, item=None):
        if self.window:
            self.window.show()
            self.window.restore()
            self.refresh_frontend()

    def refresh_frontend(self):
        if self.window:
            state_json = json.dumps(self.api.get_initial_state())
            self.window.evaluate_js(f"renderState({state_json})")

    def on_window_closing(self):
        # In pywebview closing handlers, returning False cancels the native close.
        if self.is_quitting:
            return True

        result = self.api.turn_off_focus_mode()
        if not result["success"]:
            self.window.create_confirmation_dialog(
                "Focus Mode",
                "Could not turn off Focus Mode. Please run the app as Administrator.",
            )
            return False

        if self.window:
            self.window.hide()
        return False

    def quit_app(self, icon=None, item=None):
        self.is_quitting = True
        result = self.api.turn_off_focus_mode()
        if not result["success"]:
            self.is_quitting = False
            self.show_window()
            if self.window:
                self.window.create_confirmation_dialog(
                    "Focus Mode",
                    "Could not turn off Focus Mode. Please run the app as Administrator.",
                )
            return

        if self.tray_icon:
            self.tray_icon.stop()
        if self.window:
            self.window.destroy()


def main():
    app = FocusModeApp()
    app.create_window()
    app.create_tray_icon()

    # debug=True allows you to open Chromium DevTools by right-clicking the window.
    webview.start(debug=True, icon=get_icon_path())


if __name__ == "__main__":
    main()
