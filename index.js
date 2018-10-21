var isIE = typeof document.createElement("span").dragDrop === "function";

var draggableElement = document.querySelectorAll('[draggable="true"]');

[].forEach.call(draggableElement, addDnDHandlers);

function addDnDHandlers(elem) {
  customDragImage.call(elem, {
    offsetX: 50,
    offsetY: 50,
    createDragImage: function(elem) {
      var nodeElem = elem.cloneNode(true);
      nodeElem.innerHTML = "I'm a custom node from " + elem.innerHTML;
      nodeElem.className = "draggingElem";
      return nodeElem;
    }
  });
  elem.addEventListener("dragstart", function(e) {
    e.dataTransfer.setData("Text", "Foo");
  });
}

function customDragImage(options) {
  var offsetX = options.offsetX || 0,
    offsetY = options.offsetY || 0;

  var createDragImage = function($node, x, y) {
    var testnode = options.createDragImage($node);
    testnode.style.top = Math.max(0, y - offsetY) + "px";
    testnode.style.left = Math.max(0, x - offsetX) + "px";
    testnode.style.position = "absolute";
    testnode.style.pointerEvents = "none";
    document.body.appendChild(testnode);

    setTimeout(function() {
      document.body.removeChild(testnode);
    });
    return testnode;
  };
  if (isIE) {
    this.addEventListener("mousedown", function(e) {
      var node = createDragImage(this, e.pageX, e.pageY);
      node.dragDrop();
    });
  }

  this.addEventListener("dragstart", function(e) {
    var dt = e.dataTransfer;
    if (typeof dt.setDragImage === "function") {
      var node = createDragImage(this, e.pageX, e.pageY);
      dt.setDragImage(node, offsetX, offsetY);
    }
  });

  return this;
}
