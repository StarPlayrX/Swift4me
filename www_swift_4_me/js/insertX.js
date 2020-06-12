/*
 insertX.js v0.0.3a (c) 2020 by _Todd _Bruss Swift4.me Swift4me.com
 the UltraLite JS, HTML and CSS framework for building dynamic websites
 Presenting Blue Minimal Dark UI by Todd Bruss (c) 2020
 */

//MARK: _O => _Objects by Reference
const _O = {
    d               : document,
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
    smooth          : 'smooth',
    relative        : 'relative',
    start           : 'start',
    topbar          : 'top-nav-bar',

    
}

//MARK: _I => _Integers
const _I = {
    zero            : 0,
    delay           : 200,
    space           : 16,
}

//MARK: _B => _Buttons
const _B = {
    mini            : 'minimal',
    default         : 'default',
    dash            : '-',
    up              : 'up',
    down            : 'down',
    this            : 'this',
    comma           : ',',
}

const insertBtns = _ => {
    _A.empty.forEach.call(_O.d.getElementsByTagName(_), x => {
        
        let mi = x.dataset.mini
        let cl = x.dataset.clik
        let ar = x.dataset.args
        let na = x.dataset.name
             
        let ck = cl + "('" + ar + "') "
        let up = _B.this + _B.comma + "'" + _B.mini + _B.dash + mi
        let dn = _B.this + _B.comma + "'" + _B.mini + _B.dash + mi + _B.dash + _B.down

        //MARK: To Do - loop over the guts for this button? Come up with a pattern for future.
        let bn = "<button onclick=" +
        ck + "onmouseup=minimalButton(" +
        up + "') onmousedown=minimalButton(" +
        dn + "') onmouseleave=minimalButton(" +
        up + "') ontouchstart=minimalButton(" +
        dn + "') ontouchend=minimalButton(" +
        up + "') class='" + _B.mini + _B.dash + mi + "'>"+
        na + "</button>"

        x.insertAdjacentHTML(_S.end, bn)
        
    } )
}

const insertFile = _ => {
    _A.empty.forEach.call(_O.d.getElementsByTagName(_), x =>
        fetch(_S.cd    + x.dataset.fold +
              _S.slash + x.dataset.file +
              _S.dot   + x.dataset.type )
        .then(_ => _.text())
        .then(_ => x.insertAdjacentHTML(_S.end, _))
    )
}

//MARK: Reset Main Menu
const reset = menu => {
    let item = _O.d.getElementById(menu)
    item.selectedIndex = 0
}

//MARK: Startup menu location
const startup = _ => {
    let item = _O.d.getElementById(_)
    let menu = item[1]
    scrollView(menu)
}

//MARK: copy text to clipboard
const text2clip = utf8 => {
    let text = document.getElementById(utf8 + '-txt')
    console.log(text)
    text.select()
    _O.d.execCommand(_S.copy)
    text.blur()
}

//MARK: JavaScript only scrolling
const scrollView = menu => {
    let tb = _O.d.getElementById(_S.topbar).clientHeight
    let m = _O.d.getElementById(menu.value)
    let pos = m.style.position
    let top = m.style.top
    m.style.position = _S.relative
    m.style.top = `-${tb + _I.space}px`
    m.scrollIntoView({behavior: _S.smooth, block: _S.start})
    m.style.top = top
    m.style.position = pos
}

//MARK: Select menu with snap option
const select = menu => {
        
    scrollView(menu)
    menu.value = _S.empty //reset menu
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

startup(_S.menu)
reset(_S.menu)
init()

