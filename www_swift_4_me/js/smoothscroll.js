/* https://github.com/iamdustan/smoothscroll */
/* Smooth scroll Polyfill by Dustan Kasten */
/* Forked ES6 refactoring by Todd Bruss, changes to be posted by June 21st 2020 */

/* Changes, set x values to 0 as we won't be scrolling anything horizontally */
const smoothscroll = _ => {
    const w = window
    const d = document
    
    if ('scrollBehavior' in d.documentElement.style && !w.__forceSmoothScrollPolyfill__)
        return
    
    const Element = w.HTMLElement || w.Element
    
    const original = { scroll: w.scroll || w.scrollTo, scrollBy: w.scrollBy, elementScroll: Element.prototype.scroll || scrollElement, scrollIntoView: Element.prototype.scrollIntoView }
    
    const now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now
    
    const isMicrosoftBrowser = userAgent => {
        const userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/']
        return new RegExp(userAgentPatterns.join('|')).test(userAgent)
    }
    
    const ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0
    
    function scrollElement(x,y) { 0, this.scrollTop = y }
    
    const ease = k => { return 0.5 * (1 - Math.cos(Math.PI * k)) }
    
    const shouldBailOut = firstArg => {
        if (
            firstArg === null ||
            typeof firstArg !== 'object' ||
            firstArg.behavior === undefined ||
            firstArg.behavior === 'auto' ||
            firstArg.behavior === 'instant'
            ) {
            return true
        }
        
        if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') return false
            // throw error when behavior is not supported
            throw new TypeError(`behavior member of ScrollOptions ${firstArg.behavior} is not a valid value for enumeration ScrollBehavior.`)}
    
    const hasScrollableSpace = ({clientHeight, scrollHeight, clientWidth, scrollWidth}, axis) => {
        if (axis === 'Y')
            return clientHeight + ROUNDING_TOLERANCE < scrollHeight
    
        if (axis === 'X')
            return clientWidth + ROUNDING_TOLERANCE < scrollWidth
    }
    
    const canOverflow = (el,axis) => {
        const overflowValue = w.getComputedStyle(el, null)[`overflow${axis}`]
        return overflowValue === 'auto' || overflowValue === 'scroll'
    }
    
    const isScrollable = el => { return hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y') }
    
    const findScrollableParent = el => {
        while (el !== d.body && !isScrollable(el))
            el = el.parentNode || el.host
        
        return el
    }
    
    const step = (context) => {
        const time = now()
        let value
        let currentX
        let currentY
        
        var distance = context.y - context.startY
        var multiplier = 1
        
        if (distance < 0 ) { distance *= -1 }
        
        if (distance >= 0 && distance <= 500) {
            multiplier = 1
        } else if (distance >= 500.001 && distance <= 1000) {
            multiplier = 2
        } else if  (distance >= 1000.001 && distance <= 2000) {
            multiplier = 3
        } else if  (distance >= 2000.001 && distance <= 4000) {
            multiplier = 4
        } else {
            multiplier = 5
        }
                
        let elapsed = (time - context.startTime) / (450 * multiplier)
        // avoid elapsed times higher than one
        elapsed = elapsed > 1 ? 1 : elapsed
        
        // apply easing to elapsed time
        value = ease(elapsed)
        
        currentX = 0
        currentY = context.startY + (context.y - context.startY) * value
        
        context.method.call(context.scrollable, currentX, currentY)
        
        // scroll more if we have not reached our destination
        if (currentX !== context.x || currentY !== context.y)
            w.requestAnimationFrame(step.bind(w, context))

    }
    
    const smoothScroll = (el, x, y) => {
        let scrollable
        let startX = 0
        x = 0
        let startY
        let method
        const startTime = now()
        
        // define scroll context
        if (el === d.body) {
            scrollable = w
            startY = w.scrollY || w.pageYOffset
            method = original.scroll
        } else {
            scrollable = el
            startY = el.scrollTop
            method = scrollElement
        }
                 
        step({scrollable,method,startTime,startY,y})
    }
    
    w.scroll = w.scrollTo = (...args) => {
        if (args[0] === undefined)
            return

        if (shouldBailOut(args[0])) {
            original.scroll.call(w,0, args[0].top !== undefined ? args[0].top : args[1] !== undefined ? args[1] : w.scrollY || w.pageYOffset)
            return
        }
        
        smoothScroll.call(w, 0, args[0].top !== undefined ? ~~args[0].top : w.scrollY || w.pageYOffset)
    }
    
    w.scrollBy = (...args) => {
        if (args[0] === undefined)
            return
  
        if ( shouldBailOut(args[0]) ) {
            original.scrollBy.call(w, 0, args[0].top !== undefined ? args[0].top : args[1] !== undefined ? args[1] : 0 )
            return
        }
        
        smoothScroll.call(w, 0, ~~args[0].top + (w.scrollY || w.pageYOffset) )
    }
    
    Element.prototype.scroll = Element.prototype.scrollTo = (...args) => {
        if (args[0] === undefined)
            return
    
        if (shouldBailOut(args[0])) {
            if (typeof args[0] === 'number' && args[1] === undefined) { throw new SyntaxError('Value could not be converted') }
            original.elementScroll.call(this, 0, args[0].top !== undefined ? ~~args[0].top : args[1] !== undefined ? ~~args[1] : this.scrollTop )
            return
        }
        
        const left = 0
        const top = args[0].top
        
        smoothScroll.call(this, 0, typeof top === 'undefined' ? this.scrollTop : ~~top)
    }
    
    Element.prototype.scrollBy = (...args) => {
        if (args[0] === undefined)
            return
 
        if (shouldBailOut(args[0])) {
            original.elementScroll.call( this,0, args[0].top !== undefined ? ~~args[0].top + this.scrollTop : ~~args[1] + this.scrollTop )
            return
        }
        
        this.scroll({left: 0, top: ~~args[0].top + this.scrollTop,behavior: args[0].behavior})
    }
    
    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function(...args) {
        // avoid smooth behavior if not required
        if (shouldBailOut(args[0])) {
            original.scrollIntoView.call(this, args[0] === undefined ? true : args[0])
            return
        }
        
        // LET THE SMOOTHNESS BEGIN!
        const scrollableParent = findScrollableParent(this)
        const parentRects = scrollableParent.getBoundingClientRect()
        const clientRects = this.getBoundingClientRect()
        
        if (scrollableParent !== d.body) {
            // reveal element inside parent
            smoothScroll.call(this,scrollableParent,0,scrollableParent.scrollTop + clientRects.top - parentRects.top)
            
            // reveal parent in viewport unless is fixed
            if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
                w.scrollBy({left: 0,top: parentRects.top,behavior: 'smooth'})
            }
        } else {
            // reveal element in viewport
            w.scrollBy({left: 0,top: clientRects.top,behavior: 'smooth'})
        }
    }
}

smoothscroll()
