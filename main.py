import ctypes
import sys
import blocker

def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

def request_admin() -> bool:
    if is_admin():
        return True
    else:
        print("Requesting administrator privileges...")
        ctypes.windll.shell32.ShellExecuteW(
            None, "runas", sys.executable, " ".join(sys.argv), None, 1)
        return False

if __name__ == "__main__":
    if not is_admin():
        if not request_admin():
            print("Failed to obtain administrator privileges.")
            sys.exit(1)
    
    data = blocker.load_json("data.json")