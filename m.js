//


(function () {


    var buildIds = function buildIds(data, tags) {
        var i = 0;
        var j = 0;
        var ids = [];
        for (i = 0; i < data.length; ++i) {
            for (j = 0; j < tags.length; ++j) {
                if (data[i]['tags'].includes(tags[j])) {
                    ids.push(data[i]['id']);
                }
            }
        }
        return ids;
    };


    var buildUrl = function buildUrl(ids) {
        var a = document.getElementById('link');
        var baseUrl = 'http://www.youtube.com/watch_videos?title=m&video_ids=';
        if (ids.length > 0) {
            a.setAttribute('href', baseUrl + ids.join(','));
        } else {
            a.removeAttribute('href');
        }
    };


    var buildFrame = function buildFrame(ids) {
        var frame = document.getElementById('frame');
        var baseUrl = 'http://www.youtube.com/embed/?rel=0&playlist=';
        if (ids.length > 0) {
            frame.setAttribute('src', baseUrl + ids.join(','));
        } else {
            frame.removeAttribute('src');
        }
    };


    var initTags = function initTags(data) {
        var fieldset = document.getElementById('tags');
        var i = 0;
        var j = 0;
        var tags = [];
        var label = null;
        var text = null;
        var input = null;
        for (i = 0; i < data.length; ++i) {
            for (j = 0; j < data[i]['tags'].length; ++j) {
                if (!tags.includes(data[i]['tags'][j])) {
                    tags.push(data[i]['tags'][j]);
                }
            }
        }
        for (i = 0; i < tags.length; ++i) {
            label = document.createElement('label');
            text = document.createTextNode(tags[i]);
            input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('value', tags[i]);
            label.appendChild(text);
            label.appendChild(input);
            fieldset.appendChild(label);
        }
    };


    var update = function update(data, tags) {
        var ids = buildIds(data, tags);
        buildUrl(ids);
        buildFrame(ids);
    };


    var getTags = function getTags() {
        var checkboxes = document.querySelectorAll('#tags input:checked');
        var i = 0;
        var tags = [];
        for (i = 0; i < checkboxes.length; ++i) {
            tags.push(checkboxes[i].getAttribute('value'));
        }
        return tags;
    };


    var onGoClicked = function onGoClicked(data) {
        var tags = getTags();
        update(data, tags);
    };


    var onReady = function onReady(data) {
        var go = document.getElementById('go');
        var tags = null;
        initTags(data);
        tags = getTags();
        update(data, tags);
        go.addEventListener('click', function() {
            onGoClicked(data);
        });
    };


    var init = function init(data) {
        document.addEventListener('DOMContentLoaded', function () {
            onReady(data);
        });
    };


    var theData = [
        {'id': 'n95eekfFZZg', 'tags': ['ro', 'in']},
        {'id': '29uruM5-VYo', 'tags': ['ro', 'in']},
        {'id': 'OC-JEWj5hZY', 'tags': ['em', 'dh']},
        {'id': 'dheVr7Wdrro', 'tags': ['so', 'ja']}
    ];


    init(theData);


})();


// EOF