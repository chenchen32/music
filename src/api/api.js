const ajax = function(args, callback) {
    let {method, url, data} = {...args}
    let r = new XMLHttpRequest()
    r.open(method, url, true)
    // r.setRequestHeader('Content-Type', 'application/json')
    r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    r.onreadystatechange = () => {
        if (r.readyState === 4) {
            if ((r.status >= 200 && r.status < 300) || r.status === 304) {
                callback(r)
            } else {
                console.log('error')
            }
        }
    }
    r.send(data)
    return r
}

class Api {
    constructor() {
        this.baseUrl = 'https://v1.itooi.cn/'
    }

    get(path, callback, isPathEqualToUrl) {
        let method = 'GET'
        let url = this.baseUrl + path
        if (isPathEqualToUrl) {
            url = path
        }
        let args = {
            method,
            url,
            data: null,
        }
        return ajax(args, callback)
    }
}

class MusicApi extends Api {
    searchResult(queryObj, callback) {
        let {input, pageSize, page, company} = {...queryObj}
        let path = `${company}/search?keyword=${input}&type=song&pageSize=${pageSize}&page=${(page - 1) * pageSize}`
        // 如果需要源数据，加上 &format=1
        this.get(path, callback)
    }

    hotPlayList(queryObj, callback) {
        let {category, pageSize, page, company} = {...queryObj}
        let path = `${company}/songList/hot?categoryType=${category}&pageSize=${pageSize}&page=${(page - 1) * pageSize}`
        this.get(path, callback)
    }

    albumDetailInfo(queryObj, callback) {
        let {albumId, company} = {...queryObj}
        let path = `${company}/songList?id=${albumId}`
        let ajax = this.get(path, callback)
        MusicApi.abortObj.albumDetail = ajax.abort.bind(ajax)
    }

    getLyric(lrcUrl, callback) {
        this.get(lrcUrl, callback, true)
    }

    getImgInHomePage(callback) {
        let url = 'https://v1.itooi.cn/netease/banner'
        this.get(url, callback, true)
    }
}

MusicApi.abortObj = {}

export {
    MusicApi,
}