#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;
use tauri::SystemTray;
use tauri_plugin_autostart::MacosLauncher;

fn main() {
  let system_tray = SystemTray::new();
  tauri::Builder::default()
    .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, true))
    .system_tray(system_tray)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

