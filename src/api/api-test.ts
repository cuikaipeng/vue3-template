import axios from "axios";
import rest from "../plugins/rest-api";

const path = "/api/v1/question";

type APIParams = {
  page: number, 
  size: number, 
  questionContent?: string, 
  questionType?: string
}

export default {
  getData (page: number, size: number, questionContent: string | null, questionType: string | null, success: void, fail: void) {
    axios.get(path + '/findAllByPage', {
      params: {
        page: page,
        size: size,
        questionContent: questionContent,
        questionType: questionType
      }
    })
    .then(response => {
        rest.onResponse(response, success, fail);
    }).catch(error => {
        rest.onError(error, fail);
    });
  },
};

// export function search(params: APIParams) {
//   return axios.get(path + '/findAllByPage', {params: params});
// }