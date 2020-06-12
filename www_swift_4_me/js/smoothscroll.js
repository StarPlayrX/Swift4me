/* https://github.com/iamdustan/smoothscroll */
/* Smooth scroll Polyfill by Dustan Kasten */
/* Forked ES6 refactoring by Todd Bruss, changes to be posted by June 21st 2020 */

const smoothscroll = _ => {
    // aliases
    const w = window
    const d = document
    
    // return if scroll behavior is supported and polyfill is not forced
    if (
        'scrollBehavior' in d.documentElement.style &&
        w.__forceSmoothScrollPolyfill__ !== true
        ) {
        return
    }
    
    // globals
    const Element = w.HTMLElement || w.Element
    const SCROLL_TIME = 468
    
    // object gathering original scroll methods
    const original = {
    scroll: w.scroll || w.scrollTo,
    scrollBy: w.scrollBy,
    elementScroll: Element.prototype.scroll || scrollElement,
    scrollIntoView: Element.prototype.scrollIntoView
    }
    
    // define timing method
    const now =
    w.performance && w.performance.now
    ? w.performance.now.bind(w.performance)
    : Date.now
    
    /**
     * indicates if a the current browser is made by Microsoft
     * @method isMicrosoftBrowser
     * @param {String} userAgent
     * @returns {Boolean}
     */
    const isMicrosoftBrowser = userAgent => {
        const userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/']
        
        return new RegExp(userAgentPatterns.join('|')).test(userAgent)
    }
    
    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    const ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0
    
    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x,y) {
        this.scrollLeft = x
        this.scrollTop = y
    }
    
    /**
     * returns result of applying ease math func to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    const ease = k => {
        return 0.5 * (1 - Math.cos(Math.PI * k))
    }
    
    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    const shouldBailOut = firstArg => {
        if (
            firstArg === null ||
            typeof firstArg !== 'object' ||
            firstArg.behavior === undefined ||
            firstArg.behavior === 'auto' ||
            firstArg.behavior === 'instant'
            ) {
            // first argument is not an object/null
            // or behavior is auto, instant or undefined
            return true
        }
        
        if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') return false
            
            // throw error when behavior is not supported
            throw new TypeError(
                                `behavior member of ScrollOptions ${firstArg.behavior} is not a valid value for enumeration ScrollBehavior.`
                                )
            }
    
    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    const hasScrollableSpace = ({clientHeight, scrollHeight, clientWidth, scrollWidth}, axis) => {
        if (axis === 'Y') {
            return clientHeight + ROUNDING_TOLERANCE < scrollHeight
        }
        
        if (axis === 'X') {
            return clientWidth + ROUNDING_TOLERANCE < scrollWidth
        }
    }
    
    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    const canOverflow = (el,axis) => {
        const overflowValue = w.getComputedStyle(el, null)[`overflow${axis}`]
        return overflowValue === 'auto' || overflowValue === 'scroll'
    }
    
    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    const isScrollable = el => {
        const isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y')
        const isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X')
        return isScrollableY || isScrollableX
    }
    
    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    const findScrollableParent = el => {
        while (el !== d.body && isScrollable(el) === false) {
            el = el.parentNode || el.host
        }
        
        return el
    }
    
    /**
     * self invoked func that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    const step = context => {
        const time = now()
        let value
        let currentX
        let currentY
        let elapsed = (time - context.startTime) / SCROLL_TIME
        
        // avoid elapsed times higher than one
        elapsed = elapsed > 1 ? 1 : elapsed
        
        // apply easing to elapsed time
        value = ease(elapsed)
        
        currentX = context.startX + (context.x - context.startX) * value
        currentY = context.startY + (context.y - context.startY) * value
        
        context.method.call(context.scrollable, currentX, currentY)
        
        // scroll more if we have not reached our destination
        if (currentX !== context.x || currentY !== context.y) {
            w.requestAnimationFrame(step.bind(w, context))
        }
    }
    
    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    const smoothScroll = (el, x, y) => {
        let scrollable
        let startX
        let startY
        let method
        const startTime = now()
        
        // define scroll context
        if (el === d.body) {
            scrollable = w
            startX = w.scrollX || w.pageXOffset
            startY = w.scrollY || w.pageYOffset
            method = original.scroll
        } else {
            scrollable = el
            startX = el.scrollLeft
            startY = el.scrollTop
            method = scrollElement
        }
        
        // scroll looping over a frame
        step({
            scrollable,
            method,
            startTime,
            startX,
            startY,
            x,
            y
        })
    }
    
    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = (...args) => {
        // avoid action when no arguments are passed
        if (args[0] === undefined) {
            return
        }
        
        // avoid smooth behavior if not required
        if (shouldBailOut(args[0]) === true) {
            original.scroll.call(
                                 w,
                                 args[0].left !== undefined
                                 ? args[0].left
                                 : typeof args[0] !== 'object'
                                 ? args[0]
                                 : w.scrollX || w.pageXOffset,
                                 // use top prop, second argument if present or fallback to scrollY
                                 args[0].top !== undefined
                                 ? args[0].top
                                 : args[1] !== undefined
                                 ? args[1]
                                 : w.scrollY || w.pageYOffset
                                 )
            
            return
        }
        
        // LET THE SMOOTHNESS BEGIN!
        smoothScroll.call(
                          w,
                          d.body,
                          args[0].left !== undefined
                          ? ~~args[0].left
                          : w.scrollX || w.pageXOffset,
                          args[0].top !== undefined
                          ? ~~args[0].top
                          : w.scrollY || w.pageYOffset
                          )
    }
    
    // w.scrollBy
    w.scrollBy = (...args) => {
        // avoid action when no arguments are passed
        if (args[0] === undefined) {
            return
        }
        
        // avoid smooth behavior if not required
        if (shouldBailOut(args[0])) {
            original.scrollBy.call(
                                   w,
                                   args[0].left !== undefined
                                   ? args[0].left
                                   : typeof args[0] !== 'object' ? args[0] : 0,
                                   args[0].top !== undefined
                                   ? args[0].top
                                   : args[1] !== undefined ? args[1] : 0
                                   )
            
            return
        }
        
        // LET THE SMOOTHNESS BEGIN!
        smoothScroll.call(
                          w,
                          d.body,
                          ~~args[0].left + (w.scrollX || w.pageXOffset),
                          ~~args[0].top + (w.scrollY || w.pageYOffset)
                          )
    }
    
    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = (...args) => {
        // avoid action when no arguments are passed
        if (args[0] === undefined) {
            return
        }
        
        // avoid smooth behavior if not required
        if (shouldBailOut(args[0]) === true) {
            // if one number is passed, throw error to match Firefox implementation
            if (typeof args[0] === 'number' && args[1] === undefined) {
                throw new SyntaxError('Value could not be converted')
            }
            
            original.elementScroll.call(
                                        this,
                                        // use left prop, first number argument or fallback to scrollLeft
                                        args[0].left !== undefined
                                        ? ~~args[0].left
                                        : typeof args[0] !== 'object' ? ~~args[0] : this.scrollLeft,
                                        // use top prop, second argument or fallback to scrollTop
                                        args[0].top !== undefined
                                        ? ~~args[0].top
                                        : args[1] !== undefined ? ~~args[1] : this.scrollTop
                                        )
            
            return
        }
        
        const left = args[0].left
        const top = args[0].top
        
        // LET THE SMOOTHNESS BEGIN!
        smoothScroll.call(
                          this,
                          this,
                          typeof left === 'undefined' ? this.scrollLeft : ~~left,
                          typeof top === 'undefined' ? this.scrollTop : ~~top
                          )
    }
    
    // Element.prototype.scrollBy
    Element.prototype.scrollBy = (...args) => {
        // avoid action when no arguments are passed
        if (args[0] === undefined) {
            return
        }
        
        // avoid smooth behavior if not required
        if (shouldBailOut(args[0]) === true) {
            original.elementScroll.call(
                                        this,
                                        args[0].left !== undefined
                                        ? ~~args[0].left + this.scrollLeft
                                        : ~~args[0] + this.scrollLeft,
                                        args[0].top !== undefined
                                        ? ~~args[0].top + this.scrollTop
                                        : ~~args[1] + this.scrollTop
                                        )
            
            return
        }
        
        this.scroll({
        left: ~~args[0].left + this.scrollLeft,
        top: ~~args[0].top + this.scrollTop,
        behavior: args[0].behavior
        })
    }
    
    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function(...args) {
        // avoid smooth behavior if not required
        if (shouldBailOut(args[0]) === true) {
            original.scrollIntoView.call(
                                         this,
                                         args[0] === undefined ? true : args[0]
                                         )
            
            return
        }
        
        // LET THE SMOOTHNESS BEGIN!
        const scrollableParent = findScrollableParent(this)
        const parentRects = scrollableParent.getBoundingClientRect()
        const clientRects = this.getBoundingClientRect()
        
        if (scrollableParent !== d.body) {
            // reveal element inside parent
            smoothScroll.call(
                              this,
                              scrollableParent,
                              scrollableParent.scrollLeft + clientRects.left - parentRects.left,
                              scrollableParent.scrollTop + clientRects.top - parentRects.top
                              )
            
            // reveal parent in viewport unless is fixed
            if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
                w.scrollBy({
                left: parentRects.left,
                top: parentRects.top,
                behavior: 'smooth'
                })
            }
        } else {
            // reveal element in viewport
            w.scrollBy({
            left: clientRects.left,
            top: clientRects.top,
            behavior: 'smooth'
            })
        }
    }
}

if (typeof exports === 'object' && typeof module !== 'undefined') {
    // commonjs
    module.exports = { smoothscroll }
} else {
    // global
    smoothscroll()
}

smoothscroll()

