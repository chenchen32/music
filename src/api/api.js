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

    registerAbort(name, ajax) {
        MusicApi.abortObj[name] = ajax.abort.bind(ajax)
    }

    abortRequest(abortName) {
        let isRequesting = MusicApi.abortObj[abortName] !== undefined
        if (isRequesting) {
            MusicApi.abortObj[abortName]()
        }
    }

    get(path, callback, abortName, isPathEqualToUrl) {
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
        this.abortRequest(abortName)
        let request = ajax(args, callback)
        this.registerAbort(abortName, request)
    }
}

class MusicApi extends Api {
    searchResult(queryObj, callback) {
        let {input, pageSize, page, company} = {...queryObj}
        let path = `${company}/search?keyword=${input}&type=song&pageSize=${pageSize}&page=${(page - 1) * pageSize}`
        // 如果需要源数据，加上 &format=1
        let abortName = 'searchResult'
        this.get(path, callback, abortName)
    }

    hotPlayList(queryObj, callback) {
        let {category, pageSize, page, company} = {...queryObj}
        let path = `${company}/songList/hot?categoryType=${category}&pageSize=${pageSize}&page=${(page - 1) * pageSize}`
        let abortName = 'hotPlayList'
        this.get(path, callback, abortName)
    }

    albumDetailInfo(queryObj, callback) {
        let {albumId, company} = {...queryObj}
        let path = `${company}/songList?id=${albumId}`
        let abortName = 'albumDetail'
        this.get(path, callback, abortName)
    }

    // getSong() {
    //     let abortName = 'getSong'
    //     this.get()
    // }

    getLyric(lrcUrl, callback) {
        let abortName = 'getLyric'
        this.get(lrcUrl, callback, abortName, true)
    }

    getImgInHomePage(callback) {
        let url = 'https://v1.itooi.cn/netease/banner'
        let abortName = 'getImgInHomePage'
        this.get(url, callback, abortName, true)
    }
}

MusicApi.abortObj = {}

export {
    MusicApi,
}