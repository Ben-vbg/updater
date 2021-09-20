const {ipcRenderer} = require('electron');

// ipcRenderer.send('resize-me-please');

$('.do_close').on('click', e => {
  ipcRenderer.send('close-app');
});

$('.do_resize').on('click', e => {
  ipcRenderer.send('resize-app');
});

$('.do_reduce').on('click', e => {
  ipcRenderer.send('reduce-app');
});
