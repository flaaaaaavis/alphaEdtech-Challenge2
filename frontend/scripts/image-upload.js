let uppy = new Uppy.Core()
      .use(Uppy.Dashboard, {
        inline: true,
        target: '#drag-drop-area',
      })
      .use(Uppy.XHRUpload, {
        endpoint: 'http://localhost:3000/image',
        fieldName: 'photo',
        formData: true,
      })

uppy.on('complete', (result) => {
    console.log('Upload complete! We’ve uploaded these files:', result.successful)
})
