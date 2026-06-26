from backend.core import storage, blocker

class FocusApi:
    def __init__(self):
        # Load state into memory when the API initializes
        self.data = storage.load_data()

    def get_initial_state(self):
        """Called by React on startup to populate the UI."""
        return self.data

    def toggle_master(self):
        """Toggles the master switch without losing individual site preferences."""
        self.data["master_on"] = not self.data["master_on"]
        storage.save_data(self.data)
        
        success = blocker.apply_blocks(self.data["sites"], self.data["master_on"])
        return {"success": success, "state": self.data}

    def toggle_site(self, url):
        """Toggles a specific site."""
        for site in self.data["sites"]:
            if site["url"] == url:
                site["enabled"] = not site["enabled"]
                break
                
        storage.save_data(self.data)
        success = blocker.apply_blocks(self.data["sites"], self.data["master_on"])
        return {"success": success, "state": self.data}

    def add_site(self, url):
        if not any(site["url"] == url for site in self.data["sites"]):
            self.data["sites"].append({"url": url, "enabled": True})
            storage.save_data(self.data)
            success = blocker.apply_blocks(self.data["sites"], self.data["master_on"])
            return {"success": success, "state": self.data}
        return {"success": False, "error": "Site already exists"}

    def remove_site(self, url):
        self.data["sites"] = [site for site in self.data["sites"] if site["url"] != url]
        storage.save_data(self.data)
        success = blocker.apply_blocks(self.data["sites"], self.data["master_on"])
        return {"success": success, "state": self.data}