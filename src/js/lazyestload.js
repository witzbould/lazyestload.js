! function () {

    // main function wrapper

    function lazyestload() {

        // all the images with class lazyestload

        var images = document.querySelectorAll("img.lazyestload");
        var i = images.length;

        // loop de loop

        while (i--) {
            var srcs;
            var img = images[i];
            var boundingRect = img.getBoundingClientRect();
            var offset = 100;
            var yPositionTop = boundingRect.top - window.innerHeight;
            var yPositionBottom = boundingRect.bottom;

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
                    var sources = img.parentElement.querySelectorAll("source");
                    var j = sources.length;
                    while (j--) {
                        sources[j].srcset = sources[j].getAttribute("data-srcset");
                    }
                }

                // wait until the new image is loaded

                img.addEventListener('load', function() {
                    this.classList.remove("lazyestload");
                });

            }
        }
    }

    // run on debounced scroll event and once on load

    let b;

    // debounced scroll event

    window.addEventListener("scroll", function () {
        clearTimeout(b);
        b = setTimeout(lazyestload, 200);
    });

    lazyestload();
}();
