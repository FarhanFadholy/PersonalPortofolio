import React, {useEffect,useRef,useState,useCallback} from "react"

const IsDevice = (() => {
    if (typeof navigator == 'undefined') return
  
    let ua = navigator.userAgent
  
    return {
      info: ua,
  
      Android() {
        return ua.match(/Android/i)
      },
      BlackBerry() {
        return ua.match(/BlackBerry/i)
      },
      IEMobile() {
        return ua.match(/IEMobile/i)
      },
      iOS() {
        return ua.match(/iPhone|iPad|iPod/i)
      },
      iPad() {
        return (
          ua.match(/Mac/) &&
          navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 2
        )
      },
      OperaMini() {
        return ua.match(/Opera Mini/i)
      },
  
      /**
       * Any Device
       */
      any() {
        return (
          IsDevice.Android() ||
          IsDevice.BlackBerry() ||
          IsDevice.iOS() ||
          IsDevice.iPad() ||
          IsDevice.OperaMini() ||
          IsDevice.IEMobile()
        )
      }
    }
  })()


function useEventListener(eventName, handler, element = document) {
    const savedHandler = useRef()
  
    useEffect(() => {
      savedHandler.current = handler
    }, [handler])
  
    useEffect(() => {
      const isSupported = element && element.addEventListener
      if (!isSupported) return
  
      const eventListener = (event) => savedHandler.current(event)
  
      element.addEventListener(eventName, eventListener)
  
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    }, [eventName, element])
  }
  
  /**
 * Cursor Core
 * Replaces the native cursor with a custom animated cursor, consisting
 * of an inner and outer dot that scale inversely based on hover or click.
 *
 * @author Stephen Scaff (github.com/stephenscaff)
 *
 * @param {string} color - rgb color value
 * @param {number} outerAlpha - level of alpha transparency for color
 * @param {number} innerSize - inner cursor size in px
 * @param {number} innerScale - inner cursor scale amount
 * @param {number} outerSize - outer cursor size in px
 * @param {number} outerScale - outer cursor scale amount
 * @param {object} outerStyle - style object for outer cursor
 * @param {object} innerStyle - style object for inner cursor
 * @param {array}  clickables - array of clickable selectors
 *
 */
  function CursorCore({
    outerStyle,
    innerStyle,
    color = '220, 90, 90',
    outerAlpha = 0.3,
    innerSize = 8,
    outerSize = 8,
    outerScale = 6,
    innerScale = 0.6,
    trailingSpeed = 8,
    clickables = [
      'a',
      'input[type="text"]',
      'input[type="email"]',
      'input[type="number"]',
      'input[type="submit"]',
      'input[type="image"]',
      'label[for]',
      'select',
      'textarea',
      'button',
      '.link'
    ]
  }) {
    const cursorOuterRef = useRef();
    const cursorInnerRef = useRef();
    const requestRef = useRef();
    const previousTimeRef = useRef();
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(true); // Always true
    const [isActive, setIsActive] = useState(false);
    const [isActiveClickable, setIsActiveClickable] = useState(false);
    let endX = useRef(0);
    let endY = useRef(0);
  
    // Mouse move event
    const onMouseMove = useCallback(({ clientX, clientY }) => {
      setCoords({ x: clientX, y: clientY });
      cursorInnerRef.current.style.top = `${clientY}px`;
      cursorInnerRef.current.style.left = `${clientX}px`;
      endX.current = clientX;
      endY.current = clientY;
    }, []);
  
    // Outer cursor animation
    const animateOuterCursor = useCallback(
      (time) => {
        if (previousTimeRef.current !== undefined) {
          coords.x += (endX.current - coords.x) / trailingSpeed;
          coords.y += (endY.current - coords.y) / trailingSpeed;
          cursorOuterRef.current.style.top = `${coords.y}px`;
          cursorOuterRef.current.style.left = `${coords.x}px`;
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animateOuterCursor);
      },
      [trailingSpeed, coords]
    );
  
    useEffect(() => {
      requestRef.current = requestAnimationFrame(animateOuterCursor);
      return () => cancelAnimationFrame(requestRef.current);
    }, [animateOuterCursor]);
  
    // Mouse events
    const onMouseDown = useCallback(() => setIsActive(true), []);
    const onMouseUp = useCallback(() => setIsActive(false), []);
    const onMouseEnterViewport = useCallback(() => setIsVisible(true), []);
    const onMouseLeaveViewport = useCallback(() => setIsVisible(true), []); // Ensure cursor never hides
  
    useEventListener('mousemove', onMouseMove);
    useEventListener('mousedown', onMouseDown);
    useEventListener('mouseup', onMouseUp);
    useEventListener('mouseover', onMouseEnterViewport);
    useEventListener('mouseout', onMouseLeaveViewport);
  
    // Cursor styles
    useEffect(() => {
      if (isActive) {
        cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(${innerScale})`;
        cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(${outerScale})`;
      } else {
        cursorInnerRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOuterRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, [innerScale, outerScale, isActive]);
  
    // Visibility logic
    useEffect(() => {
      cursorInnerRef.current.style.opacity = isVisible ? 1 : 1; // Always visible
      cursorOuterRef.current.style.opacity = isVisible ? 1 : 1; // Always visible
    }, [isVisible]);
  
    // Clickable elements hover logic
    useEffect(() => {
      const clickableEls = document.querySelectorAll(clickables.join(','));
      clickableEls.forEach((el) => {
        // Hapus baris ini agar kursor bawaan tetap muncul
        // el.style.cursor = 'none';
        el.addEventListener('mouseover', () => {
          setIsActive(true);
          setIsActiveClickable(true); // Pastikan efek aktif pada elemen interaktif
        });
        el.addEventListener('mouseout', () => {
          setIsActive(false);
          setIsActiveClickable(false);
        });
      });
    
      return () => {
        clickableEls.forEach((el) => {
          el.removeEventListener('mouseover', () => setIsActive(true));
          el.removeEventListener('mouseout', () => setIsActive(false));
        });
      };
    }, [clickables]);
    
  
    // Style for custom cursor
    const styles = {
      cursorInner: {
        zIndex: 9999,
        position: 'fixed',
        width: innerSize,
        height: innerSize,
        backgroundColor: `rgba(${color}, 1)`,
        borderRadius: '50%',
        pointerEvents: 'none', // Jangan menghalangi interaksi
        transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out'
      },
      cursorOuter: {
        zIndex: 9999,
        position: 'fixed',
        width: outerSize,
        height: outerSize,
        backgroundColor: `rgba(${color}, ${outerAlpha})`,
        borderRadius: '50%',
        pointerEvents: 'none', // Jangan menghalangi interaksi
        transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out'
      }
    };    
  
    // // Hide default cursor
    // document.body.style.cursor = 'none';
  
    return (
      <React.Fragment>
        <div ref={cursorOuterRef} style={styles.cursorOuter} />
        <div ref={cursorInnerRef} style={styles.cursorInner} />
      </React.Fragment>
    );
  }
    
  /**
   * AnimatedCursor
   * Calls and passes props to CursorCore if not a touch/mobile device.
   */
  function AnimatedCursor({
    outerStyle,
    innerStyle,
    color,
    outerAlpha,
    innerSize,
    innerScale,
    outerSize,
    outerScale,
    trailingSpeed,
    clickables
  }) {
    if (typeof navigator !== 'undefined' && IsDevice.any()) {
      return <React.Fragment></React.Fragment>
    }
    return (
      <CursorCore
        outerStyle={outerStyle}
        innerStyle={innerStyle}
        color={color}
        outerAlpha={outerAlpha}
        innerSize={innerSize}
        innerScale={innerScale}
        outerSize={outerSize}
        outerScale={outerScale}
        trailingSpeed={trailingSpeed}
        clickables={clickables}
      />
    )
  }
  
 
export default AnimatedCursor