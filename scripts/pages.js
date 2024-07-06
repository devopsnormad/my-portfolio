document.addEventListener("DOMContentLoaded", function () {
  var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Modify this part to handle &lt; and &gt; replacements
    var displayTxt = this.txt.replace(/(&lt;|&gt;)/g, function (match) {
      switch (match) {
        case "&lt;":
          return '<span class="lt brace">&lt;</span>';
        case "&gt;":
          return '<span class="gt brace">&gt;</span>';
        default:
          return match;
      }
    });

    this.el.innerHTML = '<span class="wrap">' + displayTxt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 100;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }

  // Inject CSS for styling
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = `
   .txt-rotate.wrap { border-right: 0em solid #666; }
   .lt.brace,.gt.brace { color: white!important; }
`;
  document.body.appendChild(css);
});

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn-projects");
  const projectItems = document.querySelectorAll(".project-item");

  function filterProjects(filter) {
    projectItems.forEach((item) => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.getAttribute("data-filter");
      filterProjects(filter);
    });
  });

  // Initial display setup
  document
    .querySelector('.btn-projects[data-filter="all"]')
    .classList.add("active");
  filterProjects("all");
});
