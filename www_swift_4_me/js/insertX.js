/*
 insertX.js v0.0.2a (c) 2020 by _Todd _Bruss Swift4.me Swift4me.com
 the UltraLite JS, HTML and CSS framework for building dynamic websites
 Presenting Blue Minimal Dark UI by Todd Bruss (c) 2020
 */

//MARK: _O => _Objects by Reference
const _O = {
    doc  : document,
    win  : window
}

//MARK: _A => _Arrays
const _A = {
    empty           : [],
}

//MARK: _S => _Strings
const _S = {
    X               : 'insert-X',
    B               : 'button-X',
    end             : 'afterend',
    copy            : 'copy',
    empty           : '',
    dot             : ".",
    cd              : "./",
    slash           : "/",
    menu            : 'selectmenu',
}

//MARK: _I => _Integers
const _I = {
    zero            : 0,
    delay           : 200,
}

//MARK: _B => _Buttons
const _B = {
    mini               : 'minimal',
    default            : 'default',
    dash               : '-',
    up                 : 'up',
    down               : 'down',
    this               : 'this',
    comma              : ',',
}

//MARK: To Do Refactor this, so it's neater and introduce customer variables instead of strings
const insertBtns = _ => {
    _A.empty.forEach.call(_O.doc.getElementsByTagName(_), x => {
        
        let mini = x.dataset.mini
        let clik = x.dataset.clik
        let args = x.dataset.args
        let name = x.dataset.name
             
        let click = clik + "('" + args + "') "
        let pattn = _B.this + _B.comma + "'" + _B.mini + _B.dash + mini
        
        //MARK: To Do - loop over the guts for this button
        let bttn = "<button onclick=" + click + "onmouseup=minimalButton(" +
        pattn + "') onmousedown=minimalButton(" +
        pattn + _B.dash + _B.down + "') onmouseleave=minimalButton(" +
        pattn + "') ontouchstart=minimalButton(" +
        pattn + _B.dash + _B.down + "') ontouchend=minimalButton(" +
        pattn + "') class='" + _B.mini + _B.dash + mini + "'> " + name + " </button>"

        x.insertAdjacentHTML(_S.end, bttn)
        
    } )
}

const insertFile = _ => {
    _A.empty.forEach.call(_O.doc.getElementsByTagName(_), x =>
        fetch(_S.cd    + x.dataset.fold +
              _S.slash + x.dataset.file +
              _S.dot   + x.dataset.type )
        .then(_ => _.text())
        .then(_ => x.insertAdjacentHTML(_S.end, _))
    )
}

//MARK: Reset Main Menu
const reset = menu => {
    let item = _O.doc.getElementById(menu)
    item.selectedIndex = 0
}

//MARK: Startup menu location
const startup = _ => {
    let item = _O.doc.getElementById(_)
    let menu = item[0]
    _O.win.location = `#${menu.value}`
}

//MARK: copy text to clipboard
const text2clip = utf8 => {
    let text = _O.doc.getElementById(utf8)
    text.select()
    _O.doc.execCommand(_S.copy)
    text.blur()
}

//MARK: Select menu with snap option
const select = (menu,snap) => {
    _O.win.location = `#${menu.value}`
    
    //snap to empty string or selected value
    menu.value = snap ? _S.empty : menu.value
}

//MARK: Select menu with snap option
const minimalButton = (obj, def) => {
    obj.className = def
    setTimeout( _ => obj.blur(), _I.delay )
}

//MARK: Startup insertX.js
const init = _ =>
insertFile(_S.X)
insertBtns(_S.B)
reset(_S.menu)
startup(_S.menu)

init()

/* detect fullscreen on iPhone, not in use
if ('standalone' in navigator && navigator.standalone && (/iphone|ipod|ipad/gi).test(navigator.platform) && (/Safari/i).test(navigator.appVersion)) {
    let test = _O.doc.getElementById('navi')
    test.classList.add("navi")
}*/
