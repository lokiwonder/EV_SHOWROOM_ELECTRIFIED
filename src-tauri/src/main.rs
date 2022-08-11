#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;
use tauri_plugin_autostart::MacosLauncher;

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, false))
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

