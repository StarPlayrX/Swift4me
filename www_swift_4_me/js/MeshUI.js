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
default             : 'default',
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
        
        let ck = `${cl}('${ar}') `
        let up = `${_B.this + _B.comma}'${_B.mini}${_B.dash}${mi}`
        let dn = `${_B.this + _B.comma}'${_B.mini}${_B.dash}${mi}${_B.dash}${_B.down}`
        
        let bn = `<button onclick=${ck}onmouseup=minimalButton(${up}') onmousedown=minimalButton(${dn}') onmouseleave=minimalButton(${up}') ontouchstart=minimalButton(${dn}') ontouchend=minimalButton(${up}') class='${_B.mini}${_B.dash}${mi}'>${na}</button>`
        
        x.insertAdjacentHTML(_S.end, bn)
        
    } )
}


const log = _ => {
    console.log(_)
}

const insertRepeat = _ => {
    
    _A.empty.forEach.call(_O.d.getElementsByTagName(_), x => {
       
       let type = x.dataset.type //To Be used in the future
       let fold = x.dataset.fold //This may become an array for flexibility, maybe have a check for it
       var files = x.dataset.files
       var names = x.dataset.names
       names = names.split(',').reverse();
       files = files.split(',').reverse();
       
        for (var i in files ) {
            let snippet = `
                <!-- Snippet -->
                   <div id='${files[i]}'>
                       <section>
                           <left>
                               <heading>${names[i]}</heading>
                           </left>
                           <clipboard>
                               <insert-X
                                   data-fold='${fold}'
                                   data-file='${files[i]}'
                                   data-type='txt'>
                               </insert-X>
                           </clipboard>
                           <right>
                               <button-X
                                   data-mini='default'
                                   data-clik='text2clip'
                                   data-args='${files[i]}'
                                   data-name='Clipboard'>
                               </button-X>
                           </right>
                       </section>
                       <article>
                           <insert-X
                               data-fold='${fold}'
                               data-file='${files[i]}'
                               data-type='html'>
                           </insert-X>
                       </article>
                   </div>`
                 x.insertAdjacentHTML(_S.end, snippet)
        }
   } )

    insertFile('insert-X')
    insertBtns(_S.B)

}

const buyme = _ => {
    window.open("https://www.ebay.com/itm/153975182809", "_blank")
}
const insertFile = _ => {
    _A.empty.forEach.call
    ( _O.d.getElementsByTagName(_), x =>
     fetch(_S.cd    + x.dataset.fold +
           _S.slash + x.dataset.file +
           _S.dot   + x.dataset.type )
     .then(_ => _.text())
     .then(_ => x.insertAdjacentHTML(_S.end, _)) )
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
    let text = document.getElementById(`${utf8}-txt`)
    console.log(text)
    text.select()
    _O.d.execCommand(_S.copy)
    text.blur()
}

//MARK: JavaScript only scrolling
const scrollView = ({value}) => {
    
    superSpacer()
    
    let tb = _O.d.getElementById(_S.topbar).clientHeight
    let m = _O.d.getElementById(value)
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
insertRepeat('repeat-X')

//reset(_S.menu)
//startup(_S.menu)

superSpacer()

init()


const xxx = body.clientHeight;


const isScreenDirty = false;

const setScreen = (padding,height, width) => {
    _O.d.getElementById(_S.bottombar).style.padding = padding
    body.style.height = height
    body.style.width = width

}


_O.w.addEventListener('touchend', _ => {
    if (globalScene) {
        _O.w.scrollTo(0,_O.w.scrollY)
       // alert(`outerWidth ${_O.w.outerWidth}\nouterHeight ${_O.w.outerHeight}\ninnerWidth ${_O.w.innerWidth}\ninnerHeight ${_O.w.innerHeight}`)
    }

});


_O.w.addEventListener('scroll', e => {
       e.preventDefault()
});


var globalScene = true

_O.w.addEventListener('resize', _ => {
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
    
    log(`screenX: ${screenX}  screenY: ${screenY}`)
    log(`windowX: ${windowX}  windowY: ${windowY}`)
    log(`orientation: ${orientation}`)
    
    
    //resize constants
    let padZ  = "0"
    let padB = "0 0 20px 0"
    let vh = "99.9vh"
    let vw = "100vw"
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
    
    let isX = false;
    
    if (displayY === largeX || displayY === smallX) {
        isX = true
    }
    
    //MARK: iPhone X, iPhone Xs, iPhone Xs Max, iPhone XÊ
    if ( orientation === portrait && !fullscreen && isX && windowX == displayX ) {
        if ( screenX == displayY && screenY == displayX && windowY == displayY - _177px ) {
            setScreen( padB, vh, vw )
            globalScene = false
        } else if ( screenX == displayX && screenY == displayY && windowY == displayY - _177px ) {
            setScreen( padZ, per, per )
        } else if ( screenX == displayX && screenY == displayY && windowY >= displayY - _96px ) {
            setScreen( padB, per, per )
        }
    }
    
    //MARK: iPhone 8plus, iPhone 8
    if ( orientation === portrait && !fullscreen && !isX && windowX == displayX  ) {
        if ( screenX == displayY && screenY == displayX && windowY == displayY - _114px  ) {
            setScreen( padZ, vh, vw )
        } else if ( screenX == displayX && screenY == displayY && windowY == displayY - _114px ) {e
            setScreen( padZ, per, per )
        } else if ( screenX == displayX && screenY == displayY && windowY >= displayY - _40px ) {
            setScreen( padZ, per, per )
        }
    }
    
   e
    if ( fullscreen && isX && orientation === portrait) {
        setScreen( padB, vh, vw )
        globalScene = false
    } else if ( fullscreen && !isX && orientation === portrait) {
        setScreen( padZ, vh, vw )
        globalScene = false

    } else if (orientation === landscape && isX ) {
        setScreen( padB, per, per )
    } else if (orientation === landscape && !isX ) {
        setScreen( padZ, per, per )
    }
    
    if (!fullscreen && displayX == screenY && displayY == screenX) {
        setScreen( padB, vh, vw )
        globalScene = true
    }

    setTimeout( _ => superSpacer(), second )
})


//MARK: JavaScript only scrolling
const scrollView2 = id => {
    
    superSpacer()
    
    let tb = _O.d.getElementById(_S.topbar).clientHeight
    let m = _O.d.getElementById(id)
    let pos = m.style.position
    let top = m.style.top
    m.style.position = _S.relative
    m.style.top = `-${tb + _I.space - 1 + _S.px}`
    m.scrollIntoView({behavior: _S.smooth, block: _S.start})
    m.style.top = top
    m.style.position = pos
}
