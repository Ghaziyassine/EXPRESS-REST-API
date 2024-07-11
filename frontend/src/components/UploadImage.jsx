import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UploadImage = () => {
    const [file, setFile] = useState();
    const [image,setImage] = useState(); 
    const handleUpload = (e) => {
        const formedata = new FormData();
        formedata.append('file',file);
        axios.post('http://localhost:3000/upload',formedata)
        .then(res => console.log(res))
        .catch(err =>console.log(err))
    };
useEffect(()=>{
    axios.get('http://localhost:3000/getImage')
    .then(res =>setImage(res.data[0].image))
    .catch(err =>console.log(err))
},[])
    return (
        <div>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            <br />
            <img src={'http://localhost:3000/images/'+image} alt="" />
        </div>
    )
}

export default UploadImage