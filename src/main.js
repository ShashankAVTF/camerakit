import{
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
}from '@snap/camera-kit'

(async function () {
    
    var cameraKit= await bootstrapCameraKit({
        apiToken:'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzMyNzc3OTIzLCJzdWIiOiI5YzRkNjMxNy1iYmI5LTRjODQtOWYzMC0wZTVmMzA3NDUxZGZ-U1RBR0lOR34zYjY4MTBkYy0xN2Y2LTRmNzctYTNiZS02YTdjMjU0Zjc2YjgifQ.La2HprjDjaVTHUAEgc7hvsk2xKx7krdqfvuPwdXzN9o'
    });

    const session= await cameraKit.createSession()
    document.getElementById('canvas').replaceWith(session.output.live)

    const {lenses} = await cameraKit.lensRepository.loadlensGroups(['67e7b4ff-7878-46fd-b778-adbf25e9a722'])

    session.applyLens(lenses[0])

    let mediaStream = await navigator.mediaDevices.getUserMedia({video:true});
    
    const source= createMediaStreamSource(mediaStream,{
        transform: Transform2D.MirrorX,
        cameraType: 'front'
    })

    await session.setSource(source);
    session.source.setRenderSize(window.innerWidth,window.innerHeight)

    session.play();

})();
