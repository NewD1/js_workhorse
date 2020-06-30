"use strict";

window.onload = () => {
  function Router(name, routes) {
    (this.name = name), (this.routes = routes);
  }

  let view = document.getElementById("view");

  let myRouter = new Router("myRouter", [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Content",
      path: "/content",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ]);

  //changing urls
  let allRoutes = Array.from(document.querySelectorAll("[route]"));

  function makeContent(path, view) {
    switch (path) {
      case "/":
        view.innerHTML = "Welcome home!";
        break;
      case "/about":
        view.innerHTML = "what ABOUT";
        setInterval(
          function printNumbers(from, to) {
            console.log(from++);
          },
          1000,
          1,
          10
        );
        break;
      case "/content":
        {
          //description of DOM-elements
          //      start button
          let startButton = document.createElement("button");
          startButton.className = "start";
          startButton.innerHTML = "Start!";
          //      exit button
          let exitButton = document.createElement("button");
          exitButton.className = "exit";
          exitButton.innerHTML = "Exit!";
          //      fullscreen button
          let fullScr = {
            btn: document.createElement("button"),
            full: true,
          };
          fullScr.btn.className = "fullscr";
          fullScr.btn.innerHTML =
            '<img src="./assets/img/fullscr.png" width="30px">';
          //      app tree
          function DOMelem(DOMelemTitle) {
            this.content = document.createElement(DOMelemTitle);
            this.action = undefined;
          }

          let appTree = new Array(7).fill({}).map(() => {
            return new DOMelem("div");
          });

          //      create app's nav bar
          appTree.reduce(
            (change, elem) => {
              elem.content.addEventListener("mouseover", () => {
                elem.content.style.cursor = "pointer";
                elem.content.style.boxShadow =
                  "0 0 0 2px #fff, 0 0 0 5px blueviolet";
                elem.content.style.transition = "0.3s";
              });
              elem.content.addEventListener("mouseout", () => {
                elem.content.style.boxShadow = "";
                elem.content.style.cursor = "";
              });

              let offsetToStr = change.offset + "vh";
              switch (change.number) {
                case 0:
                  elem.content.innerHTML = "begin";
                  elem.content.className = "block_style";
                  break;
                case 6:
                  elem.content.innerHTML = "graduate";
                  elem.content.className = "block_style";
                  break;
                default:
                  elem.content.innerHTML = change.number;
                  elem.content.className = "internal_circle";
              }
              elem.content.style.top = offsetToStr;
              change.offset += 8;
              change.number++;
              return change;
            },
            { offset: 11, number: 0 }
          );

          //adding of events to custom DOM-elements:
          //add event for "start" button click
          startButton.addEventListener("click", () => {
            view.removeChild(startButton);
            view.appendChild(exitButton);
            view.appendChild(fullScr.btn);
            //view.appendChild(appTree);
            appTree.forEach((elem) => view.appendChild(elem.content));
          });
          //add event for exit button click
          exitButton.addEventListener("click", () => {
            for (let child of Array.from(view.childNodes)) {
              view.removeChild(child);
            }
            view.appendChild(startButton);
          });
          //add event for fullscreen button click
          fullScr.btn.addEventListener("click", () => {
            let fullBtnStyle = {
              width: fullScr.btn.width,
              heigth: fullScr.btn.height,
            };
            if (fullScr.full) {
              fullScr.btn.innerHTML =
                '<img src="./assets/img/lowscr.png" width="30px">';
              fullScr.full = false;
              view.style.width = "100vw";
              view.style.heigth = "100vh";
            } else {
              fullScr.btn.innerHTML =
                '<img src="./assets/img/fullscr.png" width="30px">';
              fullScr.full = true;
              view.style.width = "";
              view.style.heigth = "";
            }
          });
          //add events for app's menu blocks
          appTree[0].content.addEventListener("click", () => {
            view.style.cursor = "url('./assets/img/hammer.png'), default";
            console.log("ok");
          });

          //clean app screen
          view.innerHTML = "";
          let old_child = document.querySelector(".start");
          if (old_child) {
            view.removeChild(old_child);
          }

          //add "start" button
          view.appendChild(startButton);
        }
        break;
      case "/contact":
        view.innerHTML = "marsIane";
        break;
    }
  }

  function navigate(event) {
    route = event.target.attributes[0].value;
    window.history.pushState({}, "", route);
    makeContent(route, view);
  }

  allRoutes.forEach((route) => {
    route.addEventListener("click", navigate, false);
  });

  //Processing of different urls
  let currentPath = window.location.pathname;

  let route = myRouter.routes.find((r) => r.path === currentPath);

  if (route) {
    makeContent(route.path, view);
  } else {
    view.innerHTML = "So, where are u going?";
  }
};
