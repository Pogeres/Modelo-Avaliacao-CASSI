const index = {
  elements: {
    /** @type {HTMLFormElement} */
    Form: document.getElementById("form"),
  },

  steps: {
    /**  @type {string} */
    data: "Dados",
    /**  @type {string} */
    address: "Endereço",
    /**  @type {string} */
    contact: "Contato",
    /**  @type {string} */
    confirmation: "Confirmação",
    /**  @type {string} */
    attachments: "Anexos",
  },

  globals: {
    /**  @type {number} */
    step: 1,
  },

  init() {
    index.loadProgress();
    index.loadForm(index.globals.step);
    index.loadbuttons();
  },

  loadProgress() {
    const progressRow = $("<div>").addClass("progressbar");
    const progressBar = $("<div>")
      .addClass("progress")
      .attr({ id: "progress" });
    progressRow.append(progressBar.get(0));

    $.each(index.steps, function (key, name) {
      const stepRow = $("<div>")
        .addClass("progress-step")
        .attr({ "data-title": name });
      progressRow.append(stepRow.get(0));
    });
    index.elements.Form.append(progressRow.get(0));
  },

  async loadForm(page) {
    fetch(`/etapas/${page}.html`).then((response) => response.text());
    then((data) => {
      const conteudoDiv = document.getElementById("form");
      conteudoDiv.append(data);
    }).catch((error) => console.log(error));
  },

  loadbuttons() {
    const buttonsRow = $("<div>").addClass("btnGroup");

    const PreviousButton = $("<a>").addClass("btn btnPrev").attr({ href: "#" });
    PreviousButton.append("Anterior");

    const nextButton = $("<a>").addClass("btn btnNext").attr({ href: "#" });
    nextButton.append("Próximo");

    buttonsRow.append(PreviousButton.get(0), nextButton.get(0));
    index.elements.Form.append(buttonsRow.get(0));
  },
};

index.init();
