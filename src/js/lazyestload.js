; (function () {

    // img is a non-live dom-node
    // ctx is a window object

    const shouldLoad = (ctx, img) => {
        const boundingRect = img.getBoundingClientRect();
        const offset = 100;
        const yPositionTop = boundingRect.top - ctx.innerHeight;
        const yPositionBottom = boundingRect.bottom;

        // if the top of the image is within 100px from the bottom of the viewport
        // and if the bottom of the image is within 100px from the top of the viewport
        // basically if the image is in the viewport, with a bit of buffer

        return (yPositionTop <= offset && yPositionBottom >= -offset);
    }

    // img is a non-live dom-node

    const load = (img) => {
        let srcs;

        // replace the src with the data-src

        if (srcs = img.getAttribute("data-src")) {
            img.src = srcs;
        }

        // replace the srcset with the data-srcset

        if (srcs = img.getAttribute("data-srcset")) {
            img.srcset = srcs;
        }

        // replace the source srcset's with the data-srcset's

        if (img.parentElement.tagName === "PICTURE") {
            img.parentElement
                .querySelectorAll("source")
                .forEach((el) => el.srcset = el.getAttribute("data-srcset"));
        }

        // wait until the new image is loaded

        img.addEventListener('load', (event) => event.target.classList.remove("lazyestload"));
    }

    // main function wrapper
    // ctx is a window object

    const lazyestload = (ctx) => {

        // all the images with class lazyestload

        document
            .querySelectorAll("img.lazyestload")
            .forEach((el) => {
                if (shouldLoad(ctx, el)) {
                    load(el);
                }
        });

    }

    // run on debounced scroll event and once on load

    let timeoutId;

    // debounced scroll event

    window.addEventListener("scroll", () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(lazyestload, 200, window);
    });

    lazyestload(window);
})();
