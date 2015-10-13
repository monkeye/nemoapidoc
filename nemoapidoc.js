//Nemo API Doc Creator by nemohou (QQ 10433182)

function parseData(data, obj) {
    var obj = obj || null;
    var str = '<h2>' + data['name'] + '</h2>';
    for(i in data['api']) {
        str += '<hr /><h3>' + i + '</h3><br /><a href="' + data['baseurl'] + data['api'][i]['url'] + '" target="_blank">' + data['baseurl'] + data['api'][i]['url'] + '</a><br />';
        var memo = data['api'][i]['memo'] || '';
        if(memo) {
            str += memo + '<br />';
        }
        var get_request = data['api'][i]['get_request'] || '';
        var post_request = data['api'][i]['post_request'] || '';
        if(get_request || post_request) {
            str += '<b class="Request">[Request]</b><form method="' + (post_request ? 'post' : 'get') + '" _action="' + data['baseurl'] + data['api'][i]['url'] + '" onsubmit="setget(this)" target="_blank">';
        }
        if(get_request) {
            str += '<table><tr><th>[GET]';
            for(j in get_request) str += '<tr><th>' + j + '<td> = <input get="' + j + '" /><td>' + get_request[j];
            str += '</table>';
        }

        if(post_request) {
            str += '<table><tr><th>[POST]';
            for(j in post_request) str += '<tr><th>' + j + '<td> = <input name="' + j + '" /><td>' + post_request[j];
            str += '</table>';
        }
        if(get_request || post_request) {
            str += '<input type="submit"></form>';
        }
        var response = data['api'][i]['response'] || '';
        if(response) {
            str += '<b class="Response">[Response]</b><table>';
            for(j in response) str += '<tr><th>' + j + '<td>' + response[j];
            str += '</table>';
        }
        var errcode = data['api'][i]['errcode'] || '';
        if(errcode) {
            str += '<b class="ErrorCode">[ErrorCode]</b><table>';
            for(j in errcode) str += '<tr><th>' + j + '<td>' + errcode[j];
            str += '</table>';
        }
    }
    str = '<div class="nemoapidoc">' + str + '</div>';
    if(obj) {
        obj.innerHTML = str;
    } else {
        document.write(str);
    }
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