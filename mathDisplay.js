'use strict';
var equation = null;
var svgSourceCodeToDownload = '';
var renderOptions = { em: 16, ex: 8, containerWidth: 579, display: true, scale: 50, lineWidth: 1000000 };
var i = 0;
var slides = [];

// Schedule rendering
Array.prototype.forEach.call(document.getElementsByClassName("slide"), function(el) {
    var animations = [];
    Array.prototype.forEach.call(el.getElementsByClassName("math-animate"), (mathEl) => animations.push(mathEl));
    console.log("ANIMATIONS", animations)
    slides.push([el, ...animations])
});

const nextSlide = () => {
    if (i + 1 < slides.length) i++;
    console.log("TO RENDER", slides[i].slice(1))
    render();
    // window.scrollTo(0,document.body.scrollHeight);
    // scrollUp()
    $("body").animate({ scrollTop: $(document).height() }, "slow");
}

const prevSlide = () => {
    if (i > 0) i--;
    console.log("TO RENDER", slides[i].slice(1))
    $("body").animate({ scrollTop: 0 }, "slow");
    render();
}

render();

// Rendering

function render() {
    document.getElementById("slidenums").innerText = `${i + 1} / ${slides.length}`;
    slides.forEach((slide, i) => {
        slide[0].style.display = "none";
    })

    Array.prototype.forEach.call(slides[i][0].getElementsByTagName("canvas"), (dom) => dom.click())

    var slide = slides[i][0];
    slide.style.display = "block";

    slides[i].slice(1).forEach(dom => {
        var element = MathJax.tex2svg(dom.getAttribute("toDisplay"), renderOptions);
        dom.innerHTML = '';

        var svg = element.firstElementChild;

        svg.setAttribute('width', exToPx(svg.getAttribute('width')));
        svg.setAttribute('height', exToPx(svg.getAttribute('height')));
        if (dom.getAttribute("class").indexOf("dont-animate") == -1) svg.setAttribute('class', 'animation-math vertical-align-center')
        else svg.setAttribute('class', 'vertical-align-center')

        function exToPx(value) {
            var match = value.match(/^(.*)ex$/);
            console.log("MATCH", match)
            return match ? (parseFloat(match[1]) * parseFloat(dom.getAttribute("scale"))).toFixed(3) + 'px' : value;
        }

        var svgStyle = document.getElementById('MJX-SVG-styles');
        if (svgStyle && hasClass(svg)) {
            console.log('add style');
            var style = document.createElementNS(svg.namespaceURI, 'style');
            style.textContent = svgStyle.textContent;
            svg.insertBefore(style, svg.firstElementChild);
        }

        function hasClass(element) {
            for (var child = element.firstElementChild; child; child = child.nextElementSibling)
                if (child.classList.length || hasClass(child)) return true;
            return false;
        }

        var base64SourceCode = base64Encode(bytesFromText(svgSourceCodeToDownload));
        var img = document.createElement('div');
        img.style.height = "250px";
        img.style.marginLeft = "auto";
        img.style.marginRight = "auto";
        img.setAttribute("class", "imgBox")
        img.innerHTML = svg.outerHTML;
        console.log("CODE", svg.outerHTML)
        dom.appendChild(img);
    })
}

function base64Encode(bytes) {
    var map = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'];

    // Add all complete triplets
    var text = '';
    for (var i = 0; i < bytes.byteLength - 2; i += 3) {
        var value = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
        text += map[(value >> 18) & 0x3f];
        text += map[(value >> 12) & 0x3f];
        text += map[(value >> 6) & 0x3f];
        text += map[value & 0x3f];
    }

    // Add the remaining bytes
    var remaining = bytes.byteLength - i;
    if (remaining == 2) {
        var value = bytes[i] << 8 | bytes[i + 1];
        text += map[(value >> 10) & 0x3f];
        text += map[(value >> 4) & 0x3f];
        text += map[(value << 2) & 0x3f];
        text += '=';
    } else if (remaining == 1) {
        var value = bytes[i];
        text += map[(value >> 2) & 0x3f];
        text += map[(value << 4) & 0x3f];
        text += '==';
    }

    // Return the text
    return text;
}

// Returns the number of bytes required to encode a UTF-8 char.
function utf8CharLength(charCode) { // Uint ⇒ Uint
    return charCode < 0x80 ? 1 : charCode < 0x800 ? 2 : charCode < 0x10000 ? 3 : charCode < 0x200000 ? 4 : charCode < 0x4000000 ? 5 : 6;
}

// Adds a single char to a byte array at position "offset". Returns the new offset after adding the char.
function addUtf8CharToBytes(bytes, offset, charCode) { // Uint8Array, Uint, Uint ⇒ Uint
    var position = offset;
    if (charCode < 0x80) {
        bytes[position++] = charCode;
    } else if (charCode < 0x800) {
        bytes[position++] = 0xc0 | (charCode >>> 6);
        bytes[position++] = 0x80 | (charCode & 0x3f);
    } else if (charCode < 0x10000) {
        bytes[position++] = 0xe0 | (charCode >>> 12);
        bytes[position++] = 0x80 | ((charCode >>> 6) & 0x3f);
        bytes[position++] = 0x80 | (charCode & 0x3f);
    } else if (charCode < 0x200000) {
        bytes[position++] = 0xf0 | (charCode >>> 18);
        bytes[position++] = 0x80 | ((charCode >>> 12) & 0x3f);
        bytes[position++] = 0x80 | ((charCode >>> 6) & 0x3f);
        bytes[position++] = 0x80 | (charCode & 0x3f);
    } else if (charCode < 0x4000000) {
        // Must never appear in a valid UTF-8 sequence
        bytes[position++] = 0xf8 | (charCode >>> 24);
        bytes[position++] = 0x80 | ((charCode >>> 18) & 0x3f);
        bytes[position++] = 0x80 | ((charCode >>> 12) & 0x3f);
        bytes[position++] = 0x80 | ((charCode >>> 6) & 0x3f);
        bytes[position++] = 0x80 | (charCode & 0x3f);
    } else {
        // Must never appear in a valid UTF-8 sequence
        bytes[position++] = 0xfc | (charCode >>> 30);
        bytes[position++] = 0x80 | ((charCode >>> 24) & 0x3f);
        bytes[position++] = 0x80 | ((charCode >>> 18) & 0x3f);
        bytes[position++] = 0x80 | ((charCode >>> 12) & 0x3f);
        bytes[position++] = 0x80 | ((charCode >>> 6) & 0x3f);
        bytes[position++] = 0x80 | (charCode & 0x3f);
    }
    return position;
}

// Converts a string into a byte array using UTF-8 encoding.
function bytesFromText(text) { // String ⇒ Uint8Array
    var length = 0;
    for (var i = 0; i < text.length; i++)
        length += utf8CharLength(text.charCodeAt(i));

    var offset = 0;
    var bytes = new Uint8Array(length);
    for (var i = 0; i < text.length; i++)
        offset = addUtf8CharToBytes(bytes, offset, text.charCodeAt(i));

    return bytes;
}
