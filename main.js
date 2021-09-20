// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const { ipcMain } = require('electron');
const path = require('path')
const Store = require('electron-store');

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      enableRemoteModule:false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  Store.initRenderer();

  // and load the index.html of the app.
  win.loadFile('./app/dist/pages/index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  win.setSize(1280, 1080);
  win.center();

    // Load parameters and resize the window
    // ipcMain.on('resize-me-please', (event) => {
      
    // });
    
  
    ipcMain.on('close-app', (event) => {
      win.close();
    });
  
    ipcMain.on('resize-app', (event) => {
      if(win.isMaximized()){
        win.unmaximize();
      }else{
        win.maximize();
      }
    });
  
    ipcMain.on('reduce-app', (event) => {
      win.minimize();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
