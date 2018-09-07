;(function () {

    // main function wrapper

    const lazyestload = () => {

        // all the images with class lazyestload

        const images = document.querySelectorAll("img.lazyestload");
        let i = images.length;

        // loop de loop

        while (i--) {
            let srcs;
            const img = images[i];
            const boundingRect = img.getBoundingClientRect();
            const offset = 100;
            const yPositionTop = boundingRect.top - window.innerHeight;
            const yPositionBottom = boundingRect.bottom;

            // if the top of the image is within 100px from the bottom of the viewport
            // and if the bottom of the image is within 100px from the top of the viewport
            // basically if the image is in the viewport, with a bit of buffer

            if (yPositionTop <= offset && yPositionBottom >= -offset) {

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
                    img.parentElement.querySelectorAll("source").forEach((el) => el.srcset = el.getAttribute("data-srcset"));
                }

                // wait until the new image is loaded

                img.addEventListener('load', (event) => event.target.classList.remove("lazyestload"));

            }
        }
    }

    // run on debounced scroll event and once on load

    let timeoutId;

    // debounced scroll event

    window.addEventListener("scroll", () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(lazyestload, 200);
    });

    lazyestload();
})();
