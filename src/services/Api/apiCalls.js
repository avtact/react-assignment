
import axios from "axios";
// import jwt_decode from "jwt-decode";
import { Urls } from "../Urls/apiUrl";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
export const API_CALLS = {
  adminLogin,
  addMovies,
  getMovies,
  getMoviesById,
  updateMovies,
  deleteMovie
};

function deleteMovie(ids) {
  return axios.delete(Urls + "delete_movie_img/"+ids,{ headers: { Authorization: getToken() }})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error == "Unauthorized") {
        return [];
      }
      if (error.response != undefined)
        if (error.response.status === 401) {
          toast.error('Unauthorized user!', { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        } else if (error.response.status === 400) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        }else if (error.response.status === 404) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        } else if (error.response.status === 500) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        }
    });
}

function adminLogin(requestOptions) {
  return axios.post(Urls + "user-login", requestOptions)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error == "Unauthorized") {
        return [];
      }
      if (error.response != undefined)
        if (error.response.status === 401) {
          toast.error('Unauthorized user!', { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        } else if (error.response.status === 400) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        }else if (error.response.status === 404) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        } else if (error.response.status === 500) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        }
    });
}

function updateMovies(requestOptions) {
  return axios.patch(Urls + "update_movie", requestOptions,{ headers: { Authorization: getToken() }})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error == "Unauthorized") {
        return [];
      }
      if (error.response != undefined)
        if (error.response.status === 401) {
          toast.error('Unauthorized user!', { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        } else if (error.response.status === 400) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        }else if (error.response.status === 404) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        } else if (error.response.status === 500) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        }
    });
  }

function addMovies(requestOptions) {
  return axios.post(Urls + "add_movie", requestOptions,{ headers: { Authorization: getToken() }})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error == "Unauthorized") {
        return [];
      }
      if (error.response != undefined)
        if (error.response.status === 401) {
          toast.error('Unauthorized user!', { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        } else if (error.response.status === 400) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        }else if (error.response.status === 404) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        } else if (error.response.status === 500) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        }
    });
}

function getMoviesById(id) {
  return axios.get(Urls + "movie_detail?movie_id="+id,{ headers: { Authorization: getToken() }})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error == "Unauthorized") {
        return [];
      }
      if (error.response != undefined)
        if (error.response.status === 401) {
          toast.error('Unauthorized user!', { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        } else if (error.response.status === 400) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        }else if (error.response.status === 404) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        } else if (error.response.status === 500) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        }
    });
}
function getMovies() {
  return axios.get(Urls + "movie_list",{ headers: { Authorization: getToken() }})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error == "Unauthorized") {
        return [];
      }
      if (error.response != undefined)
        if (error.response.status === 401) {
          toast.error('Unauthorized user!', { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        } else if (error.response.status === 400) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        }else if (error.response.status === 404) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        } else if (error.response.status === 500) {
          toast.error(error?.response?.data?.message, { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
        }
    });
}


function getToken() {
  var t = localStorage.getItem("setUser");
      t = JSON.parse(t)
  if (t !== null) {
    if (t === undefined || t == null) {
      return false;
    }
    if (t) {
      return "Bearer " + t?.token;
    } else {
      return false
    }
  } else {
    // toast.error('Unauthorized User', { autoClose: 500, position: toast.POSITION.TOP_RIGHT });
    setTimeout(() => {
      window.location.href = "/#/login"
    }, 2000)
  }
}
