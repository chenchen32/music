const ajax = function(args, callback) {
    let {method, url, data} = {...args}
    let r = new XMLHttpRequest()
    r.open(method, url, true)
    // r.setRequestHeader('Content-Type', 'application/json')
    r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    r.onreadystatechange = () => {
        if (r.readyState === 4) {
            callback(r)
        }
    }
    r.send(data)
}

class Api {
    constructor() {
        this.baseUrl = 'https://api.itooi.cn/music/'
    }

    get(path, callback, isPathEqualToUrl) {
        let method = 'GET'
        let url
        if (isPathEqualToUrl) {
            url = path
        } else {
            url = this.baseUrl + path
        }
        let args = {
            method,
            url,
            data: null,
        }
        ajax(args, callback)
    }
}

export class MusicApi extends Api {
    searchResult(queryObj, callback) {
        let {input, limit, offset, company} = {...queryObj}
        let path = `${company}/search?key=579621905&s=${input}&type=song&limit=${limit}&offset=${offset}`
        // 如果需要源数据，加上 &isOrigin=1
        this.get(path, callback)
    }

    hotPlayList(queryObj, callback) {
        let {category, limit, offset, company} = {...queryObj}
        let path = `${company}/hotSongList?key=579621905&cat=${category}&limit=${limit}&offset=${offset}`
        this.get(path, callback)
    }

    albumDetailInfo(queryObj, callback) {
        let {albumId, company} = {...queryObj}
        let path = `${company}/songList?key=579621905&id=${albumId}`
        this.get(path, callback)
    }

    getLyric(lrcUrl, callback) {
        this.get(lrcUrl, callback, true)
    }
}
