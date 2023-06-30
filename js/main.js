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
  },

  globals: {
    /**  @type {number} */
    step: 0,
  },

  init() {
    index.loadButtons();
  },

  loadButtons() {
    const PreviousButton = $("<a>")
      .addClass("btn btnPrev")
      .attr({ href: "#", id: "btnPrev" })
      .on("click", function () {
        index.globals.step--;
        index.updateFormSteps();
      });
    PreviousButton.append("Anterior");

    const nextButton = $("<a>")
      .addClass("btn btnNext")
      .attr({ href: "#", id: "btnNext" })
      .on("click", function () {
        index.globals.step++;
        index.updateFormSteps();
      });
    nextButton.append("Próximo");

    index.elements.Buttons.append(PreviousButton.get(0), nextButton.get(0));
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
