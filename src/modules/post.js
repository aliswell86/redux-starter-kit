import {handleActions, createAction} from 'redux-actions';
import {/*pender,*/ applyPenders} from 'redux-pender';
import axios from 'axios';

function getPostAPI(postId) {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

const GET_POST = 'GET_POST';

// 미들웨어 1,2 사용
// const GET_POST_PENDING = 'GET_POST_PENDING';
// const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
// const GET_POST_FAILURE = 'GET_POST_FAILURE';

// 미들웨어 1,2 사용
// const getPostPending = createAction(GET_POST_PENDING);
// const getPostSuccess = createAction(GET_POST_SUCCESS);
// const getPostFailure = createAction(GET_POST_FAILURE);

// 1.redux-thunk
/*export const getPost = (postId) => dispatch => {
  // 요청시작 알림
  dispatch(getPostPending());
  // 요청시작
  return getPostAPI(postId).then((response) => {
    dispatch(getPostSuccess(response)); //요청성공
    return response;
  }).catch(error => {
    dispatch(getPostFailure());
    throw(error); //호출한쪽으로 에러내용을 던짐.
  });
};*/

// 2.redux-promise-middleware
// export const getPost = (postId) => ({
//   type: GET_POST,
//   payload: getPostAPI(postId)
// });

// 3.redux-pender
export const getPost = createAction(GET_POST, getPostAPI);

const initalState = {
  // 관리필요X (penderReducer가 해줌)
  // pending: false,
  // error: false,
  data: {
    title: '',
    body: ''
  }
};

const reducer = handleActions({
  //다른 일반액션들을 관리
}, initalState);

export default applyPenders(reducer, [
  {
    type: GET_POST,
    onSuccess: (state, action) => {
      const {title, body} = action.payload.data;
      return {
        data: {
          title,
          body
        }
      };
    },
    onCancel: (state, action) => {
      return {
        data: {
          title: '취소됨',
          body: '취소됨'
        }
      };
    }
    //생략됨
    // onPending: (state, action) =>{
    //   return {
    //     ...state
    //   }
    // },
    // onFailure: (state, action) =>{
    //   return {
    //     ...state
    //   }
    // }
  }
]);

  // 미들웨어 1,2 사용
  // [GET_POST_PENDING]: (state, action) => { //요청시작
  //   return {
  //     ...state,
  //     pending: true,
  //     error: false
  //   };
  // },
  // [GET_POST_SUCCESS]: (state, action) => { //응답정상
  //
  //   const {title, body} = action.payload.data;
  //   console.log(title, body);
  //   return {
  //     ...state,
  //     pending: false,
  //     data: {
  //       title,
  //       body
  //     }
  //   };
  // },
  // [GET_POST_FAILURE]: (state, action) => {
  //   return {
  //     ...state,
  //     pending: false,
  //     error: true
  //   }
  // }
