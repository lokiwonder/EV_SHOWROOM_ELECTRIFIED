use tauri::Manager;
use tauri_plugin_autostart::MacosLauncher;

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, false /* hidden flag */))
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

