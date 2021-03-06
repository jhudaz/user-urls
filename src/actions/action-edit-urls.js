import axios from 'axios';
import { getUrls } from './action-user-urls';
const apiUrl = "http://localhost:7000";


//POST new url
export function newUrl(url, UserId, score) {
  return dispatch => {
    return axios
      .post(`${apiUrl}/newUrl`, { url, UserId, score })
      .then(res => {
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
  console.log("id url:", id)
  return dispatch => {
    return axios
      .get(`${apiUrl}/getUrl`, { params: { id } })
      .then(res => {
        dispatch({
          type: "GET_ONE_URL",
          payload: res.data
        })
      })
      .catch(error => {
        throw (error);
      });
  }
}

//PUT A url
export function updateUrl(id, url, score, userId) {
  console.log('userId: ', userId);
  return dispatch => {
    return axios
      .put(`${apiUrl}/updateUrl`, { id, url, score })
      .then(res => {
        dispatch(
          getUrls(userId)
        )
      })
      .catch(error => {
        throw (error);
      });
  }
}
