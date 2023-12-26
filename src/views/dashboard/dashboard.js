import React, { useEffect, useState } from 'react'
import './dashboard.css'
import Add from '../../assets/add-icon.png'
import Logout from '../../assets/logout-icon.png'
import Edit from '../../assets/edit.png'
import Delete from '../../assets/delete.png'
import Image3 from '../../assets/image-3.png'
import Foot_Img from '../../assets/Vectors.png'
import { useNavigate } from 'react-router-dom'
import Empty from '../Empty-dashboard/Empty';
import { API_CALLS } from '../../services/Api/apiCalls'
import { toast } from 'react-toastify'

export default function Dashboard() {
    const [moviList, setMoviList] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviListAll, setMoviListAll] = useState(1);
    const navigate = useNavigate();

    const getMovies = () => {
        API_CALLS.getMovies().then(res => {
            if (res && res?.data) {
                setMoviList(res?.data);
                setMoviListAll(res?.data);
            }
        })
    }

    useEffect(() => {
        getMovies()
    }, [])

    const totalPages = Math.ceil(moviListAll.length / itemsPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const paginationArray = [];
        for (let i = 1; i <= totalPages; i++) {
            paginationArray.push(
               <div>
                 <button key={i} onClick={() => handleClick(i)} className={currentPage === i ? 'active' : 'non-active'}>
                    {i}
                </button>
               </div>
            );
        }
        return paginationArray;
    };

    useEffect(() => {
        if(moviListAll?.length>0){
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentPageData = moviListAll?.slice(startIndex, endIndex);
            setMoviList(currentPageData);
        }
    }, [currentPage, moviListAll, itemsPerPage]);

    return (
        <> <>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 pb-5'>
                                <div className='d-flex justify-content-between pt-5 pb-5'>
                                   
                                    <div className='my-movies my-auto'
                                        onClick={() => {
                                            navigate("/Create");
                                        }}
                                    >

                                        {moviList?.length>0?<>My movies<img className='mx-2' src={Add} /></>:""}
                                    </div>

                                    <div className='logout my-auto' style={{ cursor: 'pointer' }} onClick={() => {
                                        toast.warning("User logged out", { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
                                        setTimeout(() => {
                                            localStorage.clear();
                                            navigate("/");
                                        }, 1500);
                                    }}>Logout<img className='mx-2' src={Logout} /></div>
                                </div>
                            </div>
                        </div>
                       {moviList?.length>0?<> <div className='row dashboard-cards pb-5 mb-5'>
                            {moviList?.map((val, inx) => <div className='col-lg-3 col-6 d-flex justify-content-center justify-content-md-start'>
                                <div class="card p-2 mt-2" style={{ width: "16rem" }}>
                                    <div className='top-image'>
                                        <img src={val?.image} class="card-img-top" alt="..." />
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title text-white"><strong>{val?.tittle}</strong> </h5>
                                        <p class="card-title text-white">{val?.publish_year}</p>
                                      
                                        <img src={Delete} width="15" onClick={()=>{
                                            API_CALLS?.deleteMovie(val?.movie_id).then(res=>{
                                                if(res && res?.status==200){
                                                    getMovies();
                                                    toast.warning("Movie deleted",{ autoClose: 1000, position: toast.POSITION.TOP_RIGHT })
                                                }
                                            })
                                        }} style={{cursor:'pointer'}} />  &nbsp;
                                        <img src={Edit} width="25" style={{cursor:'pointer'}} onClick={()=>{
                                            navigate(`/Edit${"?ids="+val?.movie_id}`);
                                        }} />
                                    </div>
                                </div>
                            </div>)}
                            <div className="pagination ">
                                {renderPagination()}
                            </div>
                        </div></>: <Empty />}
                    </div>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-12 px-0'>
                                <div><img src={Foot_Img} width={"100%"} /></div>
                            </div>
                        </div>
                    </div>
                </>

        </>
    )
}
