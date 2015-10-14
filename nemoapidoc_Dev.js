//Nemo API Doc Creator by nemohou (QQ 10433182)

function parseData(datas, obj) {
    var obj = obj || null;
    var str = '';
    var dirs = '';
    for(var n in datas) {
        var data = datas[n];
        an = 'a' + Math.random();
        str += '<h2 id="' + an + '">' + data['name'] + '</h2>';
        dirs += '<ul><li><a href="#' + an + '">' + data['name'] + '</a><ul>';
        for(i in data['api']) {
            an = 'b' + Math.random();
            dirs += '<li><a href="#' + an + '">' + i + '</a></li>';
            str += '<h3 id="' + an + '">' + i + '</h3>';
            str += '<b class="URL">[URL]</b><br /><a href="' + data['baseurl'] + data['api'][i]['url'] + '" target="_blank">' + data['baseurl'] + data['api'][i]['url'] + '</a><br />';
            var memo = data['api'][i]['memo'] || '';
            if(memo) {
                str += memo + '<br />';
            }
            var get_request = data['api'][i]['get_request'] || '';
            var post_request = data['api'][i]['post_request'] || '';
            if(get_request || post_request) {
                str += '<b class="Request">[Request]</b><form method="post" _action="' + data['baseurl'] + data['api'][i]['url'] + '" onsubmit="setget(this)" target="_blank">';
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
                str += '<button type="submit">Submit</button></form>';
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
        dirs += '</ul></ul>';
    }
    dirs = '<style>'
        + '.nemoapidoc, .nemoapidoc table { font-size:12px }'
        + '.nemoapidoc a { color: #336699 }'
        + '.nemoapidoc th { width: 100px;text-align: left;font-weight: normal;border-left:2px solid #DDD;padding-left: 5px }'
        + '.nemoapidoc td { color: #666 }'
        + '.nemoapidoc button { border:2px solid #DDD;background:#FFF }'
        + '.nemoapidoc h2 { border-left: 8px solid #DDD; padding-left: 15px; }'
        + '.nemoapidoc h3 { border-left: 4px solid #DDD; padding-left: 5px; }'
        + '.nemoapidoc .dir { position: fixed; right:100px; border:1px solid #CCC;background: #FFF;padding:10px 100px 0 0 }'
        + '</style>' + dirs;
    dirs = '<div class="dir">' + dirs + '</div>';
    str = '<div class="nemoapidoc">' + dirs + str + '</div>';
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