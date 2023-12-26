import React from 'react'
import './Empty.css'
import Foot_Img from '../../assets/Vectors.png'
import { useNavigate } from 'react-router-dom';

export default function Empty() {
  const navigate = useNavigate();
  return (
    <>
      <div className='container-background'>
        <div className='container'>
          <div className='row' style={{ justifyContent: "center" }}>
            <div className='col-12' >
              <div className='movie-list' >Your movie list is empty</div>
            </div>
          </div>


          <div className='text-center '>
            <button type='submit' className='btn btn-login' style={{ width: "15%" }}
              onClick={() => {
                navigate("/Create")
              }}
            >Add a new movie</button>
          </div>


        </div>

      </div>
      {/* <div className='container-fluid' style={{ backgroundColor: '#093545' }}>
        <div className='row'>
          <div className='col-12 px-0'>
            <img src={Foot_Img} width={'100%'} />
          </div>
        </div>
      </div> */}
    </>
  )
}
