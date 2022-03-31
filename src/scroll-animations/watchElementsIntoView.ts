import { useState } from "react";
import * as styles from "./scroll-animations.module.css";

const SSR_MESSAGE = "Sal was not initialised! Probably it is used in SSR.";

const NOT_SUPPORTED_MESSAGE =
  "" +
  "Your browser does not support IntersectionObserver!\n" +
  "Get a polyfill from here:\n" +
  "https://github.com/w3c/IntersectionObserver/tree/master/polyfill";

export const useIntersectionObserver = () => {
  let intersectionO: IntersectionObserver;
  //   const [intersectionO, setIntersectionO] =
  //     useState<IntersectionObserver | null>(null);
  const [elements, setElements] = useState<Array<HTMLElement>>([]);
  const [options, setOptions] = useState<any>({
    root: null,
    rootMargin: "0% 50%",
    threshold: 0.3,
    animateClassName: styles.scrollAnimate,//"scroll-animate",
    disabledClassName: styles.scrollDisabled,//"scroll-disabled",
    enterEventName: "scroll:in",
    exitEventName: "scroll:out",
    selector: "[data-scroll]",
    once: false,
    disabled: false,
  });

  /**
   * Clears animation for given element.
   * @param {HTMLElement} element
   */
  const clearAnimation = (element) => {
    element.classList.remove(options.animateClassName);
  };

  /**
   * Dispatches the animate event on the intersection observer entry.
   * @param {IntersectionObserverEntry} detail The entry to fire event on.
   */
  const fireEvent = (name, entry) => {
    const event = new CustomEvent(name, {
      bubbles: true,
      detail: entry,
    });

    entry.target.dispatchEvent(event);
  };

  /**
   * Launches animation by adding class.
   * @param {IntersectionObserverEntry} entry
   */
  const animate = (entry) => {
    entry.target.classList.add(options.animateClassName);
    fireEvent(options.enterEventName, entry);
  };

  /**
   * Reverses animation by removing class.
   * @param {IntersectionObserverEntry} entry
   */
  const reverse = (entry) => {
    clearAnimation(entry.target);
    fireEvent(options.exitEventName, entry);
  };

  /**
   * Checks if element was animated.
   * @param {HTMLElement} element
   */
  const isAnimated = (element) =>
    element.classList.contains(options.animateClassName);

  /**
   * Enables animations by remove class from body.
   */
  const enableAnimations = () => {
    document.body.classList.remove(options.disabledClassName);
  };

  /**
   * Disables animations by add class from body.
   */
  const disableAnimations = () => {
    document.body.classList.add(options.disabledClassName);
  };

  /**
   * Clears observer.
   */
  const clearObserver = () => {
    if (intersectionO) {
      intersectionO.disconnect();
      //   setIntersectionO(null);
      intersectionO = null;
    }
  };

  /**
   * Check if should be disabled.
   * @return {Boolean}
   */
  const isDisabled = () =>
    options.disabled ||
    (typeof options.disabled === "function" && options.disabled());

  /**
   * IntersectionObserver callback.
   * @param  {Array<IntersectionObserverEntry>} entries
   * @param  {IntersectionObserver} observer
   */
  const onIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      const { target } = entry;
      const hasRepeatFlag = target.dataset.salRepeat !== undefined;
      const hasOnceFlag = target.dataset.salOnce !== undefined;
      const shouldRepeat = hasRepeatFlag || !(hasOnceFlag || options.once);

      if (entry.intersectionRatio >= options.threshold) {
        animate(entry);

        if (!shouldRepeat) {
          observer.unobserve(target);
        }
      } else if (shouldRepeat) {
        reverse(entry);
      }
    });
  };

  /**
   * Returns collection of elements and pushes them to observer.
   *
   * @returns {Array<Node>}
   */
  const getObservedElements = () => {
    const collection = [...document.querySelectorAll(options.selector)].filter(
      (element) => !isAnimated(element)
    );
    collection.forEach((element) => intersectionO.observe(element));
    return collection;
  };

  /**
   * Disables instance by removing animations and clearing observer.
   */
  const disable = () => {
    disableAnimations();
    clearObserver();
  };

  /**
   * Enables instance by launching new IntersectionObserver.
   */
  const enable = () => {
    enableAnimations();
    // setIntersectionO(
    //   new IntersectionObserver(onIntersection, {
    //     root: options.root,
    //     rootMargin: options.rootMargin,
    //     threshold: options.threshold,
    //   })
    // );
    intersectionO = new IntersectionObserver(onIntersection, {
      root: options.root,
      rootMargin: options.rootMargin,
      threshold: options.threshold,
    });

    setElements(getObservedElements());
  };

  /**
   * Resets instance to provide new settings.
   * @param {Object} settings
   */
  const reset = (settings = {}) => {
    clearObserver();

    Array.from(document.querySelectorAll(options.selector)).forEach(
      clearAnimation
    );

    setOptions(settings);
    enable();
  };

  /**
   * Updates observer with new elements to animated.
   * Useful for dynamically injected elements.
   */
  const update = () => {
    const newElements = getObservedElements();
    setElements((ele) => [...ele, ...newElements]);
  };

  /**
   * Init
   * @param  {Object} settings
   * @return {Object} public API
   */
  const init: (settings?: any) => any = (settings = options) => {
    setOptions(settings);

    // Early return, when window object is not defined
    // e.g. during Server Side Rendering
    if (typeof window === "undefined") {
      // eslint-disable-next-line no-console
      console.warn(SSR_MESSAGE);

      return {
        elements,
        disable,
        enable,
        reset,
        update,
      };
    }

    if (!window.IntersectionObserver) {
      disableAnimations();

      throw Error(NOT_SUPPORTED_MESSAGE);
    }

    if (!isDisabled()) {
      enable();
    } else {
      disableAnimations();
    }

    return {
      elements,
      disable,
      enable,
      reset,
      update,
    };
  };

  return {
    init,
    setOptions: (settings) =>
      setOptions((options) => ({
        ...options,
        ...settings,
      })),
  };
};
