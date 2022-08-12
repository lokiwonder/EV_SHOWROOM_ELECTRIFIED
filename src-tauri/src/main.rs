#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod hive;
pub mod iter;
pub mod key;
mod sec;
pub mod value;

use tauri::SystemTray;
use hive::Hive;
use key::RegKey;
use sec::Security;
use value::Data;

// description: windows auto start function //
fn auto_start() {
  // description: Computer\HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Run 레지스트리 불러오기 \\
  let regkey = Hive::CurrentUser.open(r"SOFTWARE\Microsoft\Windows\CurrentVersion\Run", Security::AllAccess).unwrap();
  // description: 불러온 레지스트리에 value 저장 //
  regkey.set_value("test", &Data::String(r"C:Users\lacls\Documents\Programing\ev_cms\src-tauri\target\debug\EV SHOWROOM Electrified.exe".try_into().unwrap())).unwrap();
}

fn main() {
  auto_start();
  let system_tray = SystemTray::new();
  tauri::Builder::default()
    .system_tray(system_tray)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

