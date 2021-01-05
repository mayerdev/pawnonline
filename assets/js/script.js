let editor  = CodeMirror(document.querySelector('.editor'), {
    lineNumbers: true,
    matchBrackets: true,
    value: `#include <a_samp>

main() {
    print("This is PawnOnline IDE by MayerDev");
}`,
    mode:  'text/x-csrc',
    theme: 'darcula',
    height: '100%',
    indentUnit: 4
});

document.querySelector('.button-build').onclick = async () => {
    document.querySelector('.button-build').disabled = true;
    document.querySelector('.button-build').innerText = 'Сборка...';
    
    const res = await fetch('/build', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: editor.getValue() })
    });
    
    const json = await res.json();
    
    document.querySelector('.button-build').innerText = 'Собрать';
    document.querySelector('.button-build').removeAttribute('disabled');
    
    if(json.error && json.text) return alert(json.text);
    if(json.text) window.location.href = `/${json.text}.amx`;
}

document.querySelector('.upload').onchange = async () => {
    let input = document.querySelector('.upload');
    const data = new FormData();
    data.append('file', input.files[0]);

    document.querySelector('.button-build').disabled = true;
    document.querySelector('.button-build').innerText = 'Загрузка файла...';
    
    const res = await fetch('/build/file', {
        method: 'POST',
        body: data
    });
    
    const json = await res.json();
    
    document.querySelector('.button-build').innerText = 'Собрать';
    document.querySelector('.button-build').removeAttribute('disabled');
    
    if(json.error && json.text) return alert(json.text);
    if(json.text) editor.setValue(json.text);
}

document.querySelector('.button-help').onclick = async () => alert(`Справка
CTRL + A - выделить всё
CTRL + D - удалить строку
CTRL + Backspace - удалить всё до начала строки
CTRL + Z - откатить изменение
CTRL + Y - вернуть изменение`);