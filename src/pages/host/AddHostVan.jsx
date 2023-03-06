import React, {useState} from 'react'
import { Form, useActionData, redirect} from 'react-router-dom'

import { ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { addVan, storage } from '../../api/firebase'

export async function action( {request} ){
    const formData = await request.formData()
    const vanName = formData.get('name')
    const vanPrice = formData.get('price')
    const vanType = formData.get('type')
    const vanDescription = formData.get('description')
    const vanImg = formData.get('imageurl')
   
    try {
        await addVan(vanName, vanPrice, vanType, vanDescription, vanImg )
        console.log('van added')
        return redirect('/host')
    } catch(err){
        return {
            error: err.message
        }
    }
}

export default function AddHostVan(){

   const [imageUpload, setImageUpload] = useState(null);
   const [imageUrl, setImageUrl] = useState('');

   const uploadFile = () => {
        if (imageUpload == null){
            return
        }
        try {
            const imageRef = ref(storage, `images/${imageUpload.name}`)
            uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url)
                })
            })
            console.log(imageUrl)
        } catch(error) {
            return {error: error.message}
        }
        
    } 
 
    const data = useActionData()

   
    return(
        <div>
        { data?.error && 
            <p>{data.error}</p>
        }
            <Form method='post' className='form-layout'>
            
                <input
                    name="name"
                    type='text'
                    placeholder='Van Name'
                />

        
                <input
                    name="price"
                    type='number'
                    placeholder='price'
                />
            
        
                <textarea
                    name="description"
                    type='text'
                    placeholder='Van description'
                    
                />
                
                <select name='type'>
                    <option value=''>--Select a van type--</option>
                    <option value='rugged'>Rugged</option>
                    <option value='simple'>Simple</option>
                    <option value='luxury'>Luxury</option>
                </select>

                <label htmlFor='uploadFile'>Upload Van Image</label>
                <input type='file' name='uploadFile' accept=".jpg, .jpeg, .png" onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }} />

                <button type=
                'button' onClick={uploadFile}>Upload image</button>

                <input type='hidden' name='imageurl' value={imageUrl} />
        
                <button type='submit'>Add Your Van</button>
            </Form>
        </div>
    )

}