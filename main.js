const {app, BrowserWindow,dialog} = require('electron');
const fs=require('fs');
const windows=new Set();
let mainWindow=null;

const createWindow= exports.createWindow =()=>{
    let x,y;
    const currentWindow= BrowserWindow.getFocusedWindow();
    if(currentWindow){
        const [ currentWindowX, currentWindowY ]= currentWindow.getPosition();
        x=currentWindowX+ 10;
        y=currentWindowY+ 10;
    }
    let newWindow=new BrowserWindow({x,y,show:false});
    newWindow.loadFile('index.html');
    newWindow.once('ready-to-show',()=>{
        newWindow.show();
    });
    newWindow.on('closed',()=>{
        windows.delete(newWindow);
        newWindow=null;
    });
    windows.add(newWindow);
    return newWindow;
}


const getFileFromUser = exports.getFileFromUser= (targetWindow)=>{
    /*const files=dialog.showOpenDialog({
        properties:['openFile']
    });*/
    const files=dialog.showOpenDialog(targetWindow,{
        properties: ['openFile']
        ,filters: [
        { name: 'Text Files', extensions: ['txt'] },
        { name: 'Markdown Files', extensions: ['md', 'markdown'] }
        ] });
    if(files){openFile(targetWindow,files[0])}
    //console.log(files);
    //const file= files[0];
    
    console.log(content);
};

const openFile=(targetWindow,file)=>{
    const content=fs.readFileSync(file).toString();
    targetWindow.webContents.send('file-opened',file,content);
};

app.on('ready',()=>{
    mainWindow=new BrowserWindow();
    mainWindow.loadFile('./index.html');
    //getFileFromUser();
    mainWindow.once('ready-to-show', () => {
        
        mainWindow.show();
      
        });
    mainWindow.on('closed',()=>{
        mainWindow=null;
    });
});
