let editor  = CodeMirror(document.querySelector('.editor'), {
    lineNumbers: true,
    matchBrackets: true,
    value: `#include <a_samp>

main() {
    print("This is PawnOnline IDE by MayerDev");
    print("GitHub: https://github.com/mayerdev/pawnonline");
    print("Donate: https://qiwi.com/n/MAYERDEV");
}`,
    mode:  'text/x-csrc',
    theme: 'darcula',
    height: '100%',
    indentUnit: 4,
    autoCloseBrackets: true,
    highlightSelectionMatches: true,
    styleActiveLine: true
});

document.querySelectorAll('.button-build').forEach(el => el.onclick = async () => {
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
});

document.querySelectorAll('.upload').forEach(el => el.onchange = async () => {
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
});

document.querySelectorAll('.button-help').forEach(el => el.onclick = () => alert(`Справка
CTRL + A - выделить всё
CTRL + D - удалить строку
CTRL + Backspace - удалить всё до начала строки
CTRL + Z - откатить изменение
CTRL + Y - вернуть изменение`));

document.querySelector('.button-search').onclick = () => editor.execCommand('find');

document.querySelector('.expand-menu').onclick = () => {
    let menu = document.querySelector('.menu');

    if(menu.style.display === 'none') menu.style.display = 'block';
    else menu.style.display = 'none';
}