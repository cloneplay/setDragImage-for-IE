# Custom ghost image support for HTML5 Drag &amp; Drop in Internet Explorer


In the HTML5 spec it is possible to make elements drag-and-drop-able. This is not a new info. However, when you drag a thing whatever gets dragged is a “Ghost Image” of it.

This image is created automatically, so you do not have to create it yourself. But, if a custom image is desired the event.DataTransfer.setDragImage()method can be used to set the custom image to be used.

The image will typically be an **image** element but it can also be a **canvas** or any other image element. The method's **x** and **y** coordinates are offsets where the image should appear relative to the mouse pointer.

```sh
void dataTransfer.setDragImage(img, xOffset, yOffset);
```

If you plan to use custom ghost image in your application, you will find out the hard way that Internet Explorer does not support the setDragImage method.

There is a hack to make it work in Internet Explorer.

### How does this hack work?
I noticed that if you make a change to the element’s style (adding a class that changes the appearance) inside the dragstartevent and then removing it immediately in a setTimeout, Internet Explorer will make a bitmap copy of the modified element and will use it for dragging. So, what this library actually does is, implement the setDragImage method that changes the target's element style by adding a class that includes the image that you want to appear while dragging, and then removes it. In this way, the browser displays the temporary style of the element as the drag image.

### Demo Here : https://codepen.io/cloneplay/pen/KGeJwq

## Clone and Play !!!
