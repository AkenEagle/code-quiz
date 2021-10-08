console.log("js loaded")

helloWorld = function () {
    const text = document.createTextNode("Hello World!");
    document.body.appendChild(text);
    console.log("Working")
}

document.onload = helloWorld();