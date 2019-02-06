import axios from 'axios';
import { getUrls } from './action-user-urls';
const apiUrl = "http://localhost:7000";


//POST new url
export function newUrl(url, UserId, score) {
  return dispatch => {
    return axios
      .post(`${apiUrl}/newUrl`, { url, UserId, score } )
      .then( res =>{
        dispatch(
          getUrls(UserId)
        )
      })
      .catch(error => {
        throw (error);
      });
  }
}

//GET  url by id for update
export function getUrl(id) {
  return dispatch => {
    return axios
      .get(`${apiUrl}/getUrl`, { params: { id } })
      .then(res => {
        dispatch({
          type: "GET_URL",
          payload: res.data
        })
      })
      .catch(error => {
        throw (error);
      });
  }
}