use tauri::Manager;

#[tauri::command]
async fn close_loginscreen(window: tauri::Window) {
  window.get_window("main").unwrap().hide().unwrap();
  // Close splashscreen
  if let Some(login) = window.get_window("login") {
    login.close().unwrap();
  }
  // Show main window
  window.get_window("main").unwrap().show().unwrap();
}

fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

