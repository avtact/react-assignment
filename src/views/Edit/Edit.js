import React, { useCallback, useEffect, useState } from 'react'
import '../Create/create.css'
import Foot_Img from '../../assets/Vectors.png'
import {useDropzone} from 'react-dropzone';
import Dropicon from '../../assets/drop-icon.png'
import { API_CALLS } from '../../services/Api/apiCalls';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Edit() {

   const {acceptedFiles} = useDropzone();
    
    const previewStyle = {
        marginTop: '20px',
        maxWidth: '100%',
        width:'90%',
        maxHeight: '500px',
        height:'300px'
    };
    
    const [fileName,setFileName]=useState("");
    const [image, setImage] = useState("");
    const [title,setTitle]=useState("")
    const [publishYear,setPublishYear]=useState("")
    const [err,setErr]=useState("")
    const [file,setFile]=useState("");
    const navigate=useNavigate();
    const [imageErr,setImageErr]=useState("");
    const [moviList, setMoviList] = useState([]);
    
    const onDrop = useCallback(acceptedFiles => {
        setImageErr("");
        const file = acceptedFiles[0];
        let tms="";
        tms=file?.type
        let ty=tms?.split("/")[1];
        if(ty=="jpg" || ty=="png" || ty=="jpeg"){
            setFile(file);
            setFileName(file.path +"-"+file.size);
            setImage(URL.createObjectURL(file));
        }else{
            setFile("");
            setFileName("");
            setImage("")
            setImageErr("Only *jpg, *png and jpeg file allowed");
            return false;
        }
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

    const onSubmit=()=>{
        if(title=="" || publishYear=="" || image==""){
            setErr("All fields are required");
            return false;
        }

        let ids= window.location.hash;
        let form =new FormData();
        form.append("tittle", title);
        form.append("publish_year", publishYear);
        form.append("image", file?file:image);
        form.append("movie_id", ids.slice(11, 50));
        API_CALLS.updateMovies(form).then(res=>{
            if(res && res.status==200){
              toast.success(res?.message, { autoClose: 2000, position: toast.POSITION.TOP_RIGHT });
              setTimeout(() => {
                  navigate("/dashboard");
              }, 2500);
            }
          })
    }

    
    const getMoviesById = (ids) => {
        API_CALLS.getMoviesById(ids).then(res => {
            if (res && res?.data) {
                setTitle(res?.data[0]?.tittle);
                setPublishYear(res?.data[0]?.publish_year)
                setImage(res?.data[0]?.image)
                setMoviList(res?.data);
            }
        })
    }

    useEffect(() => {
       let ids= window.location.hash;
       getMoviesById(ids.slice(11, 50))
    }, [])
    
    
  return (
    <>
    <div className='container create mb-5'>
        <div className='row'>
            <div className='col-12 py-5 mb-5'>
                <div className='my-movies my-auto'>Edit</div>
            </div>
        </div>
        <div className='row'>
            <div className='col-lg-5 col-12 d-flex justify-content-center justify-content-md-start order-2 order-lg-1'>
                <div className="uploadOuter">
                     <section className="container px-0">
                        <div {...getRootProps({ className: 'dropzone' })} className='uplaosDrop'>
                            <input {...getInputProps()} />
                            <p>{image?<>
                                <img src={image} alt="Preview" style={previewStyle} /><br/>
                                <span>{fileName?fileName +" bytes":""}</span>
                            </>:<p style={{marginTop:160}}><img src={Dropicon}/><br/>Drop an image here</p>}</p>
                        </div>
                        <div style={{color:'gray',fontSize:12,marginTop:12 ,fontWeight:"bold"}}>
                        (file dimension should be 266px(width) * 400px(height))
                        </div>
                        <div style={{color:'red',fontSize:12,marginTop:12}}>
                        {imageErr?imageErr:""}
                        </div>
                    </section>
                    </div>
                <div id="preview" />
            </div>
            <div className='col-lg-7 col-12 order-1 order-lg-2 d-flex justify-content-center justify-content-lg-start'>
                <div>
                <div className='form-group'>
                    <input type='text' value={title} onChange={(e)=>{
                        setErr("")
                        setTitle(e.target.value)
                    }} className='form-control shadow-none' placeholder='Title' />
              </div>
              <input type='text' value={publishYear} onChange={(e)=>{
                if(isNaN(e.target.value)){

                }else{
                    setErr("")
                   setPublishYear(e.target.value)
                }
              }} className='form-control publish shadow-none' placeholder='Publishing Year' />
              <div className='d-flex d-none d-lg-block'>
                <button type='submit' onClick={()=>{
                    navigate("/dashboard")
                }} className='btn btn-cancel'><strong>Cancel</strong></button>
                <button type='submit' onClick={onSubmit} className='btn btn-login'><strong>Submit</strong></button>
              </div>
                <div className='mt-2' style={{color:'red',fontSize:12}}>{err?err:""}</div>
                </div>
            </div>
            <div className='col-12 d-lg-none order-3'>
            <div className='d-flex justify-content-center'>
                <button type='submit' onClick={()=>{
                    navigate("/dashboard")
                }} className='btn btn-cancel'><strong>Cancel</strong></button>
                <button type='submit' onClick={onSubmit} className='btn btn-login'><strong>Submit</strong></button>
              </div>
            </div>
        </div>
    </div>
    <div className='container-fluid'>
            <div className='row'>
                <div className='col-12 px-0'>
                    <div><img src={Foot_Img} width={"100%"}/></div>
                </div>
            </div>
        </div>
    </>
  )
}
