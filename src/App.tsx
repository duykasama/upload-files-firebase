import React, { useRef, useState } from "react";
import "./app.scss";
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function App() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<Array<File>>();

  const chooseFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const temp = new Array<File>();
    const fileList = event.target.files;
    for (let i = 0; fileList && i < fileList?.length; i++) {
      const file = fileList.item(i);
      if (!file) {
        continue;
      }
      temp.push(file);
    }

    setFiles(temp);
  };

  const uploadImages = () => {
    if (files && files?.length < 1) {
      return;
    }
    for (let i = 0; files && i < files?.length; i++) {
      const imageRef = ref(storage, `car_images/${files[i].name + v4()}`);
      uploadBytes(imageRef, files[i]);
    }
    console.log('all files uploaded');
    
  };  

  return (
    <>
      <div className="container">
        <button onClick={() => fileRef.current?.click()} className="btn">
          Choose images
        </button>
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={chooseFiles}
          multiple
          hidden
        />
        {files && (
          <>
            <div className="image-container">
              {files.map((file) => (
                <img
                  key={v4()}
                  src={URL.createObjectURL(file)}
                  alt="image"
                  width={50}
                />
              ))}
            </div>
            <button onClick={uploadImages}>Upload</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
