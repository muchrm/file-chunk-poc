import React, { useState } from 'react';
import InputFileUpload from './components/InputFileUpload';

import './App.css';
import { chunkFile } from './utils/file-util';
const chunkSize = 1024; //1kb;  

function App() {

  const uploadFile = (file: File) => {
    console.log(chunkFile(file, chunkSize));
  }
  return (
    <div className='app'>
      <div className="content">
        <h1>Websites Checker</h1>
        <InputFileUpload isDisabled={false} uploadFileHandler={uploadFile} />
      </div>
    </div>
  );
}

export default App;
