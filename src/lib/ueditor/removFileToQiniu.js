import { Base64 } from 'js-base64'
import ajax from './ajax.js'

export default (option) => {

    let mybucket = option.bucket;
    let token = option.token;
    let picUrl = option.picUrl;
    let success = option.success;
    let error = option.error;
    let moveFileUrl = option.moveFileUrl;

    let base64Url = Base64.encode(picUrl);
    let key = '';
    // Base64.encode(new Date().getTime() + Math.floor(Math.random() * 1000));
    let bucket = mybucket || '';
    ajax({
        url: moveFileUrl + `?url=${base64Url}&bucket=${bucket}&key=${key}`,
        method: 'get',
        header: {
            'access-token': token || ''
        },
        success: function(rpn) {
            success && success(rpn);
        },
        error: function(rpn) {
            error && error(rpn);
        }
    })
};