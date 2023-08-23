import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { readFile, writeFile } from 'fs';
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 1200,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  ipcMain.on('writeFile', (e, path, data) => {
    let fp = join(__dirname, '../../' + path);
    writeFile(fp, data, () => console.log("Made file!", fp));
  });

  ipcMain.on('appendFile', (e, path, data) => {
    let fp = join(__dirname, '../../' + path);

    console.log(fp);

    //read file
    readFile(fp, 'utf8', (err, src) => {
      if(err) console.log(err);
      else {
        src = JSON.parse(src);
        //update file
        if(src.powers) src.powers.push(data);
        else src.powers = [data];
        
        writeFile(fp, JSON.stringify(src), () => console.log("Appended file!", fp));            
      }
    });
  });
})

app.on('window-all-closed', () => app.quit())
