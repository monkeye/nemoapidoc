//Nemo API Doc API文档解析系统 by nemohou (QQ 10433182)

function parseData(data) {
    var str = '<h2>【' + data['name'] + '】</h2>';
    for(i in data['api']) {    
        str += '<hr /><h3>' + i + '</h3><br /><a href="' + data['baseurl'] + data['api'][i]['url'] + '" target="_blank">' + data['baseurl'] + data['api'][i]['url'] + '</a><br />';
        var get_request = data['api'][i]['get_request'] || '';
        var post_request = data['api'][i]['post_request'] || '';
        if(get_request || post_request) {
            str += '<b>[请求]</b><form method="' + (post_request ? 'post' : 'get') + '" _action="' + data['baseurl'] + data['api'][i]['url'] + '" onsubmit="setget(this)" target="_blank">';
        }
        if(get_request) {        
            str += '[GET]<table>';
            for(j in get_request) str += '<tr><th>' + j + '<td> = <input get="' + j + '" /><td>' + get_request[j];
            str += '</table>';
        }
        
        if(post_request) {
            str += '[POST]<table>';
            for(j in post_request) str += '<tr><th>' + j + '<td> = <input name="' + j + '" /><td>' + post_request[j];
            str += '</table>';
        }        
        if(get_request || post_request) {
            str += '<input type="submit"></form>';
        }
        var response = data['api'][i]['response'] || '';
        if(response) {
            str += '<b>[响应]</b><table>';
            for(j in response) str += '<tr><th>' + j + '<td>' + response[j];
            str += '</table>';
        }
        var errcode = data['api'][i]['errcode'] || '';
        if(errcode) {
            str += '<b>[错误码]</b><table>';
            for(j in errcode) str += '<tr><th>' + j + '<td>' + errcode[j];
            str += '</table>';
        }
    }
    document.write(str);
}

function setget(obj) {
    var inputs = obj.getElementsByTagName('input');
    var param = '';
    for(i in inputs) {
        var getval = inputs[i].attributes && inputs[i].attributes['get'] || null;
        if(getval) param += getval.value + '=' + escape(inputs[i].value) + '&';
    }
    var a = obj.attributes['_action'].value;        
    obj.action = a + (a.indexOf('?') !== -1 ? '&' : '?') + param;
}