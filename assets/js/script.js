let editor  = CodeMirror(document.querySelector('.editor'), {
    lineNumbers: true,
    matchBrackets: true,
    value: `#include <a_samp>

main() {
    print("This is PawnOnline IDE by MayerDev");
}`,
    mode:  'text/x-csrc',
    theme: 'darcula',
    height: '100%'
});

document.querySelector('.button-build').onclick = async () => {
    const res = await fetch('/build', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: editor.getValue() })
    });
    
    const json = await res.json();
    
    if(json.error && json.text) return alert(json.text);
    if(json.text) window.location.href = `/${json.text}.amx`;
}

document.querySelector('.upload').onchange = () => {
    let input = document.querySelector('.upload');
    let read = new FileReader();
    
    read.readAsText(input.files[0], 'windows-1251');
    
    read.onload = () => editor.setValue(read.result);
}