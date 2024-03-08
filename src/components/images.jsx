import React from 'react'

function Images() {
    const handleupload = () => {
        let addedImages = [];
      
        window.addEventListener("paste", function (e) {
          let item = Array.from(e.clipboardData.items).find(x => /^image\//.test(x.type));
      
          let blob = item.getAsFile();
      
          let img = new Image();
      
          img.onload = function () {
            document.body.appendChild(this);
            addedImages.push(this); 
          };
      
          img.src = URL.createObjectURL(blob);
        });
      
        window.addEventListener("keydown", (e) => {
          if (e.key === 'z' && e.ctrlKey) {
            if (addedImages.length > 0) {
              const lastAddedImage = addedImages.pop();
              lastAddedImage.remove();
            }
          }
        });
      };
      
    return (
        <>
            <button className='btn' style={{
                marginTop: "10em"
            }} onClick={handleupload}>Upload Image</button>
        </>
    )
}

export default Images