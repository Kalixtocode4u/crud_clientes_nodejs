window.addEventListener("paste", e => {
    if(e.clipboardData.files.length > 0){
        const fileInput = document.querySelector('#fileInput')
        
        fileInput.files = e.clipboardData.files;

        if(e.clipboardData.files[0].type.startsWith("image/")){
            setImage(e.clipboardData.files[0])
        }else{
            console.log("Erro falha do upload");
        }

    }else{
        console.log("Erro nenhum arquivo");
    }
})

function setImage(file){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
        document.querySelector('#myPreviewImg').src = fileReader.result
    }
    
}