const index = {
  elements: {
    /** @type {HTMLFormElement} */
    FormBody: document.getElementById("FormBody"),

    /** @type {NodeListOf} */
    Forms: document.querySelectorAll(".form-step"),

    /** @type {NodeListOf} */
    NextButton: document.querySelectorAll("btnNext"),

    /** @type {NodeListOf} */
    PrevButton: document.querySelectorAll("btnPrev"),

    /** @type {HTMLDivElement} */
    multiSelect: document.getElementById("multi-select"),

    /** @type {HTMLDivElement} */
    dropBtn: document.getElementById("drop-btn"),

    /** @type {HTMLDivElement} */
    dropList: document.getElementById("drop-list"),

    /** @type {HTMLDivElement} */
    selected: document.getElementById("dropdown-selected"),
  },

  globals: {
    /**  @type {number} */
    step: 0,

    /**  @type {object} */
    options: { 1: { name: "1" }, 2: { name: "2" }, 3: { name: "3" } },
  },

  init() {
    index.multiSelectLoad();
  },

  multiSelectLoad() {
    // dropdown-button
    const button = $("<div>")
      .addClass("dropdown-button noselect w-100")
      .attr({ id: "drop-btn" })
      .on("click", function () {
        $(this).siblings(".dropdown-list").toggle();
      });
    const label = $("<div>")
      .addClass("dropdown-label")
      .append("Selecionar especialidade...");
    const selected = $("<div>")
      .addClass("dropdown-selected")
      .attr({ id: "dropdown-selected" });
    const icon = $("<i>").addClass("fa fa-chevron-down");
    button.append(label.get(0), selected.get(0), icon.get(0));

    // dropdown-list
    const dropList = $("<div>")
      .addClass("dropdown-list")
      .attr({ style: "display: none" });
    const input = $("<input>")
      .addClass("dropdown-search form-control")
      .attr({
        type: "search",
        id: "inputSpecialty",
        placeholder: "Procure sua especialidade",
        "aria-label": "Procure sua especialidade",
        "aria-describedby": "specialty",
      })
      .on("input", function () {
        var target = $(this);
        var dropdownList = target.closest(".dropdown-list");
        var search = target.val().toLowerCase();

        if (!search) {
          dropdownList.find("li").show();
          return false;
        }

        dropdownList.find("li").each(function () {
          var text = $(this).text().toLowerCase();
          var match = text.indexOf(search) > -1;
          $(this).toggle(match);
        });
      });
    const rowList = $("<ul>");

    // list
    $.each(index.globals.options, function (key, value) {
      const list = $("<li>");
      const label = $("<label>").addClass("checkbox-wrap");
      const input = $("<input>").attr({ name: value.name, type: "checkbox" });
      const name = $("<span>").attr({ for: value.name }).append(value.name);
      const check = $("<span>").addClass("checkmark");
      label.append(input.get(0), name.get(0), check.get(0));
      list.append(label.get(0));
      rowList.append(list.get(0));
    });

    dropList.append(input.get(0), rowList.get(0));

    // put in code
    index.elements.multiSelect.append(button.get(0), dropList.get(0));
  },

  updateFormSteps() {
    $(index.elements.Forms).each(function () {
      if ($(this).hasClass("form-step-active")) {
        $(this).removeClass("form-step-active");
      }
    });
    $(index.elements.Forms[index.globals.step]).addClass("form-step-active");
  },
};

index.init();
