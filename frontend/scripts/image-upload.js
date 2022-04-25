const Uppy = require('@uppy/core')
const XHRUpload = require('@uppy/xhr-upload')
const Dashboard = require('@uppy/dashboard')

let uppy = new Uppy.Core()
            .use(Dashboard, {
              inline: true,
              target: '#drag-drop-area'
            })
            .use(XHRUpload, {endpoint: '/image'})
    
          uppy.on('complete', (result) => {
            console.log('Upload complete! We’ve uploaded these files:', result.successful)
          })