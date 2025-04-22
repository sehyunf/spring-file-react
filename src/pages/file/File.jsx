import React from 'react';
import { useForm } from 'react-hook-form';

const File = () => {

  const { register, handleSubmit, formState : {isSubmitting}} = useForm({mode:"onChange"})

  return (
    <form encType='mutipart/form-data' onSubmit={handleSubmit(async (data) => {
      console.log(data)
      
      const formData = new FormData()
      // 단일 이미지
      formData.append("title", data.title)
      // formData.append("files", data.file1[0])
      // formData.append("files", data.file2[0])

      // 다중 이미지
      console.log(Array.from(data.files))
      // forEach
      Array.from(data.files).forEach((file) => {
        formData.append("files", file)
      })
      
      // 빠른 for문
      // for(let file of Array.from(data.files)){
      //   formData.append("files", file)
      // }

      await fetch("http://localhost:10000/files/api/upload", {
        method : "POST",
        body : formData
      })
        .then((res) => res.json())
        .then(console.log)
        .catch(console.error)

    })}>
      <label>
        <p>제목</p>
        <input type="text" placeholder='제목'
          {...register("title")}
        />
      </label>

      {/* <label>
        <p>이미지1</p>
        <input 
          type="file" 
          {...register("file1")}
        />
      </label>

      <label>
        <p>이미지2</p>
        <input 
          type="file" 
          {...register("file2")}
        />
      </label> */}

      <label>
        <p>다중 이미지</p>
        <input 
          type="file" 
          accept='image/*'
          multiple
          {...register("files")}
        />
      </label>
      <button disabled={isSubmitting}>전송</button>
    </form>
  );
};

export default File;