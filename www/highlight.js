function highlight(query) {
  var es=document.querySelectorAll(query),e,
  // https://gist.github.com/atk/1084980
  rx = /(?![\d\w]\s*)(\/[^\/\*][^\n\/]*\/[gi])|(".*?"|'.*?')|(\/\/.*?\n|\/\*[\x00-\xff\u00\uffff]*?\*\/)|(?:\b)(abstract|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var|void|volatile|while|with)(?:\b)|(?:\b)(Array|Boolean|Date|Function|Math|Number|Object|RegExp|String|document|window|arguments)(?:\b)|(\d[\d\.eE]*)|([\x28-\x2b\x2d\x3a-\x3f\x5b\x5d\x5e\x7b-\x7e]+|\x2f|(?=\D)\.(?=\D))/g;
  for(e=es.length;e--;)es[e].innerHTML=es[e].innerText.replace(rx,function(f,i){for(i=7;~i*!arguments[i--];);return i?'<t class=f'+i+'>'+f.replace('<','&lt;')+'</t>':''})
}
