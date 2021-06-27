const template = document.createElement("template");

template.innerHTML = `
<style>
.content {
  max-height: 0px;
  overflow: hidden;
  transition: 0.4s
}

.control {
  display: flex;
  cursor: pointer;
  justify-content: center;
}

.control:hover {
  text-decoration: underline;
}

.icon {
  height: 20px;
  transition: 0.4s;
}
</style>

<div class="container">
  <h2 class="title"></h2>
  <p class="content">
  Mauris porttitor scelerisque quam sit amet consequat. Donec sit amet nisi mauris. Nulla efficitur erat non nisl pellentesque, posuere consequat mauris commodo. In hendrerit nisl id libero pretium convallis. Nullam at massa mollis, mollis enim a, feugiat orci. Donec vestibulum quam a lobortis facilisis. Cras vel urna nec risus varius consequat ac nec ex. Nunc consectetur vehicula eros sed laoreet.
  </p>
  <div class="control">
    <span class="control-text"></span>
    <span class="control-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
    </span>
  </div>
</div>
`;

class CollText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // shadowDom Create
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector(".title").innerText = this.getAttribute(
      "title"
    );
    this.shadowRoot.querySelector(
      ".control-text"
    ).innerText = this.getAttribute("moreBtn");
    this.isCollapsed = "true" === this.getAttribute("isCollapsed");
    this.handleCollapse = () => this.toggle();
  }

  toggle() {
    const content = this.shadowRoot.querySelector(".content");
    const controlText = this.shadowRoot.querySelector(".control-text");
    const icon = this.shadowRoot.querySelector(".control-icon");

    if (this.isCollapsed) {
      content.style.maxHeight = "150px";
      icon.style.transform = "rotate(180deg)";
      controlText.innerText = this.getAttribute("lessBtn");
    } else {
      content.style.maxHeight = "0px";
      icon.style.transform = "rotate(0deg)";
      controlText.innerText = this.getAttribute("moreBtn");
    }

    this.isCollapsed = !this.isCollapsed;
  }

  connectedCallback() {
    this.toggle();
    this.shadowRoot
      .querySelector(".control")
      .addEventListener("click", this.handleCollapse);
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector(".control")
      .addEventListener("click", this.handleCollapse);
  }
}

window.customElements.define("collapse-test", CollText);
