/*
 MeshUI.js v0.0.7a (c) 2020 by _Todd _Bruss Swift4.me Swift4me.com
 the UltraLite JS, HTML and CSS framework for building dynamic websites
 Presenting Blue Minimal Dark UI by Todd Bruss (c) 2020
 */

//MARK: _O => _Objects by Reference
const _O = {
    d               : document,
    w               : window,
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
    bottombar       : 'bot-nav-bar',
    spacer          : 'spacer',
    px              : 'px',
    resize          : 'resize',
    
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
    superSpacer()

    let tb = _O.d.getElementById(_S.topbar).clientHeight
    let m = _O.d.getElementById(menu.value)
    let pos = m.style.position
    let top = m.style.top
    m.style.position = _S.relative
    m.style.top = `-${tb + _I.space + _S.px}`
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

const minimalSelect = (obj, def) => {
    obj.className = def
}

const superSpacer = _ => {
    try {
        let tb = _O.d.getElementById(_S.bottombar).clientHeight
        _O.d.getElementById(_S.spacer).style.height = String(tb + _I.space + _S.px)
    } catch (error) {
       log(error)
    }
}

//MARK: Startup insertX.js
const init = _ =>
insertFile(_S.X)
insertBtns(_S.B)
startup(_S.menu)
reset(_S.menu)
superSpacer()

init()


const log = _ => {
    console.log(_)
}



var isScreenDirty = false

const setScreen = (padding,height) => {
    _O.d.getElementById(_S.bottombar).style.padding = padding
    body.style.height = height
}

_O.w.addEventListener('resize',  function(event) {
    let w = _O.w //window
    let d = _O.d //document
    
    let max = Math.max
    let min = Math.min
    
    if (w.orientation === undefined ) { return } //return if we don't have a screen
        log("")
    let orientation = w.orientation
    let fs = w.matchMedia('(device-height: 100vh)');
    
    let fullscreen = fs.matches
    
    let screenY  = w.outerHeight
    let windowY = w.innerHeight
    
    let screenX  = w.outerWidth
    let windowX = w.innerWidth
    
    //get our display size regardless of orientation
    let displayX = min(screenX, screenY)
    let displayY = max(screenX, screenY)
    
    log("screenX: " + screenX + "  screenY: " + screenY)
    log("windowX: " + windowX + "  windowY: " + windowY)
    log("orientation: " +  orientation)
    
    //resize constants
    let padZ  = "0"
    let padB = "0 0 20px 0"
    let vh = "100vh"
    let per = "100%"
    let portrait = 0
    let landscape = -90
    let second = 1000
    
    //Mark: iPhoneX Constants
    let largeX = 896
    let smallX = 812
    let iPhone8p = 736
    
    //iPhoneX constants
    let _177px = 177
    let _96px  = 96
    
    //iPhone constants
    let _114px = 114
    let _40px  = 40

    //896 - 719 = 177
    //896 - 800 = 96
    
    var isX = false
    
    if (displayY === largeX || displayY === smallX) {
        isX = true
    }
    
    //MARK: iPhone X, iPhone Xs, iPhone Xs Max, iPhone Xʀ
    if ( orientation === portrait && !fullscreen && isX && windowX == displayX ) {
        if ( screenX == displayY && screenY == displayX && windowY == displayY - _177px ) {
            setScreen( padB, vh )
        } else if ( screenX == displayX && screenY == displayY && windowY == displayY - _177px ) {
            setScreen( padZ, per )
        } else if ( screenX == displayX && screenY == displayY && windowY >= displayY - _96px ) {
            setScreen( padB, per )
        }
    }
    
    //MARK: iPhone 8plus, iPhone 8
    if ( orientation === portrait && !fullscreen && !isX && windowX == displayX  ) {
        if ( screenX == displayY && screenY == displayX && windowY == displayY - _114px  ) {
            setScreen( padZ, vh )
        } else if ( screenX == displayX && screenY == displayY && windowY == displayY - _114px ) {
            setScreen( padZ, per )
        } else if ( screenX == displayX && screenY == displayY && windowY >= displayY - _40px ) {
            setScreen( padZ, per )
        }
    }
    
    
    if ( fullscreen && isX) {
        setScreen( padB, vh )
    } else if ( fullscreen && !isX) {
        setScreen( padZ, vh )
    } else if (orientation === landscape && isX ) {
        setScreen( padB, per )
    } else if (orientation === landscape && !isX ) {
        setScreen( padZ, per )
    }
    
    setTimeout( _ => superSpacer(), second )
})
