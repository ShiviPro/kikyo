const formData = [
  {
    id: 1,
    title: "My Most Recent Form",
    thumbnailImgSrc: "/images/filled-form.png",
    createdBy: {
      mailId: "john.doe@gmail.com",
    },
    createdAt: new Date(2025, 11, 20, 16, 23, 12),
    lastModifiedAt: new Date(2026, 0, 2, 11, 36, 45),
    lastOpenedAt: new Date(2026, 0, 6, 22, 12, 10),
    owners: [
      {
        mailId: "john.doe@gmail.com",
        lastModifiedAt: new Date(2026, 0, 2, 11, 36, 45),
        lastOpenedAt: new Date(2026, 0, 6, 22, 12, 10),
      },
    ],
    viewers: ["anybody"],
    content: `Form Markdown`,
  },
  {
    id: 2,
    title: "An Earlier Form",
    thumbnailImgSrc: "/images/filled-form.png",
    createdBy: {
      mailId: "john.doe@gmail.com",
    },
    createdAt: new Date(2025, 11, 12, 12, 12, 32),
    lastModifiedAt: new Date(2026, 0, 3, 9, 25, 45),
    lastOpenedAt: new Date(2026, 0, 8, 22, 10, 10),
    owners: [
      {
        mailId: "john.doe@gmail.com",
        lastModifiedAt: new Date(2026, 0, 2, 11, 36, 45),
        lastOpenedAt: new Date(2026, 0, 6, 22, 12, 10),
      },
      {
        mailId: "jane.doe@gmail.com",
        lastModifiedAt: new Date(2026, 0, 3, 9, 25, 45),
        lastOpenedAt: new Date(2026, 0, 8, 22, 10, 10),
      },
    ],
    viewers: [
      {
        mailId: "trinity@gmail.com",
        lastOpenedAt: new Date(2026, 0, 5, 17, 46, 12),
      },
      {
        mailId: "neo@gmail.com",
        lastOpenedAt: new Date(2026, 0, 5, 19, 25, 42),
      },
      {
        mailId: "morpheus@gmail.com",
        lastOpenedAt: new Date(2026, 0, 5, 22, 14, 57),
      },
    ],
    content: `All form data in Markdown format`,
  },
];

const currUserMailId = "jane.doe@gmail.com";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currView = "grid";
const allFormsContainer = document.getElementById("allFormsContainer");
const viewToggle = document.getElementById("viewToggle");
const formFilter = document.getElementById("formFilter");
let currFilter = formFilter.value;
let filteredFormData = JSON.parse(JSON.stringify(formData)); // creating a deep copy of the original form data
const formSorting = document.getElementById("formSorting");
let currSorting = formSorting.value;

const displayAllFormsInGrid = (formData) => {
  viewToggle.innerHTML = `<i class="fa-solid fa-list"></i>`;
  allFormsContainer.innerHTML = "";
  const allForms = document.createElement("div");
  allForms.classList.add("row");

  formData.map((currFormData) => {
    const lastOpenedAt = new Date(currFormData.lastOpenedAt);
    const currForm = document.createElement("div");
    currForm.classList.add("col-3");
    currForm.innerHTML = `
    <section class="card">
      <img
        src=${currFormData.thumbnailImgSrc}
        alt="Form Thumbnail"
        class="card-img-top p-3 pb-0 w-50 mx-auto"
      />
      <div class="card-body">
        <h6 class="card-title">${currFormData.title}</h6>
        <small class="card-text">${lastOpenedAt.getDate()} ${
      months[lastOpenedAt.getMonth()]
    } ${
      lastOpenedAt.getFullYear() +
      " at " +
      lastOpenedAt.getHours() +
      ":" +
      lastOpenedAt.getMinutes()
    }</small>
      </div>
    </section>
  `;
    allForms.appendChild(currForm);
  });
  allFormsContainer.appendChild(allForms);
};

const displayAllFormsInList = (formData) => {
  viewToggle.innerHTML = `<i class="fa-solid fa-table-cells"></i>`;
  allFormsContainer.innerHTML = "";
  const allForms = document.createElement("table");
  allForms.classList.add("table", "table-responsive-md", "table-hover");
  allForms.innerHTML = `
    <thead>
      <tr>
        <th></th>
        <th>Owned By</th>
        <th>Last Opened At</th>
        <th></th>
      </tr>
    </thead>`;
  formData.map((currFormData) => {
    const lastOpenedAt = new Date(currFormData.lastOpenedAt);
    allForms.innerHTML += `
      <tbody>
        <tr>
          <td class="d-flex align-items-center py-3">
            <i class="fa-solid fa-list mt-1"></i>
            <h6 class="ms-5 me-3 mb-1 mt-1">${currFormData.title}</h6>
            ${
              currFormData.owners.length > 1
                ? "<i class='fa-solid fa-user-group text-secondary'></i>"
                : ""
            }
            </td>
          <td class="align-middle">${currFormData.owners
            .map((currOwner) => currOwner.mailId.split("@")[0])
            .join(", ")}</td>
          <td class="align-middle">${lastOpenedAt.getDate()} ${
      months[lastOpenedAt.getMonth()]
    } ${
      lastOpenedAt.getFullYear() +
      " at " +
      lastOpenedAt.getHours() +
      ":" +
      lastOpenedAt.getMinutes()
    }</td>
          <td class="align-middle">
            <button
              class="btn btn-outline-secondary rounded-circle border-0 px-3"
            >
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </td>
        </tr>
      </tbody>
  `;
  });
  allFormsContainer.appendChild(allForms);
};

const formSortHandler = () => {
  switch (currSorting) {
    case "Last modified by me":
      filteredFormData.sort((formOne, formTwo) => {
        if (
          formOne.owners.find(
            (currOwner) => currOwner.mailId === currUserMailId
          ) &&
          formTwo.owners.find(
            (currOwner) => currOwner.mailId === currUserMailId
          )
        ) {
          const formOneLastMod = new Date(
            formOne.owners.find(
              (currOwner) => currOwner.mailId === currUserMailId
            ).lastModifiedAt
          );

          const formTwoLastMod = new Date(
            formTwo.owners.find(
              (currOwner) => currOwner.mailId === currUserMailId
            ).lastModifiedAt
          );

          return formOneLastMod.valueOf() > formTwoLastMod.valueOf()
            ? -1
            : formTwoLastMod.valueOf() > formOneLastMod.valueOf()
            ? +1
            : NaN;
        } else if (
          formOne.owners.find(
            (currOwner) => currOwner.mailId === currUserMailId
          ) &&
          formTwo.owners.find(
            (currOwner) => currOwner.mailId !== currUserMailId
          )
        ) {
          return -1;
        } else if (
          formOne.owners.find(
            (currOwner) => currOwner.mailId !== currUserMailId
          ) &&
          formTwo.owners.find(
            (currOwner) => currOwner.mailId === currUserMailId
          )
        ) {
          return +1;
        } else return NaN;
      });
      break;
    case "Last opened by me":
      filteredFormData.sort((formOne, formTwo) => {
        if (
          formOne.owners.find(
            (currOwner) => currOwner.mailId === currUserMailId
          ) &&
          formTwo.owners.find(
            (currOwner) => currOwner.mailId === currUserMailId
          )
        ) {
          const formOneLastOpen = new Date(
            formOne.owners.find(
              (currOwner) => currOwner.mailId === currUserMailId
            ).lastOpenedAt
          );

          const formTwoLastOpen = new Date(
            formTwo.owners.find(
              (currOwner) => currOwner.mailId === currUserMailId
            ).lastOpenedAt
          );

          return formOneLastOpen.valueOf() > formTwoLastOpen.valueOf()
            ? -1
            : formTwoLastOpen.valueOf() > formOneLastOpen.valueOf()
            ? +1
            : NaN;
        } else if (
          formOne.owners.find(
            (currOwner) => currOwner.mailId === currUserMailId
          ) &&
          formTwo.owners.find(
            (currOwner) => currOwner.mailId !== currUserMailId
          )
        ) {
          return -1;
        } else if (
          formOne.owners.find(
            (currOwner) => currOwner.mailId !== currUserMailId
          ) &&
          formTwo.owners.find(
            (currOwner) => currOwner.mailId === currUserMailId
          )
        ) {
          return +1;
        } else return NaN;
      });

      break;
    case "Last modified":
      filteredFormData.sort((formOne, formTwo) => {
        const formOneLastMod = new Date(formOne.lastModifiedAt);
        const formTwoLastMod = new Date(formTwo.lastModifiedAt);

        return formOneLastMod.valueOf() > formTwoLastMod.valueOf()
          ? -1
          : formTwoLastMod.valueOf() > formOneLastMod.valueOf()
          ? +1
          : NaN;
      });

      break;
    case "Title":
      filteredFormData.sort((formOne, formTwo) => {
        const formOneTitle = formOne.title.toLowerCase();
        const formTwoTitle = formTwo.title.toLowerCase();

        return formOneTitle === formTwoTitle
          ? NaN
          : formOneTitle > formTwoTitle
          ? +1
          : -1;
      });
      break;
  }

  currView === "grid"
    ? displayAllFormsInGrid(filteredFormData)
    : displayAllFormsInList(filteredFormData);
};

formSortHandler();

viewToggle.addEventListener("click", () => {
  currView = currView === "grid" ? "list" : "grid";

  currView === "grid"
    ? displayAllFormsInGrid(filteredFormData)
    : displayAllFormsInList(filteredFormData);
});

currView === "grid"
  ? displayAllFormsInGrid(filteredFormData)
  : displayAllFormsInList(filteredFormData);

formFilter.addEventListener("change", () => {
  currFilter = formFilter.value;

  switch (currFilter) {
    case "Owned by anyone":
      filteredFormData = JSON.parse(JSON.stringify(formData)); // deep copy
      break;
    case "Owned by me":
      filteredFormData = formData.filter((currForm) =>
        currForm.owners.find((currOwner) => currOwner.mailId === currUserMailId)
          ? currForm
          : false
      );
      break;
    case "Not owned by me":
      filteredFormData = formData.filter((currForm) =>
        currForm.owners.find((currOwner) => currOwner.mailId === currUserMailId)
          ? false
          : currForm
      );
      break;
  }

  formSortHandler();

  currView === "grid"
    ? displayAllFormsInGrid(filteredFormData)
    : displayAllFormsInList(filteredFormData);
});

formSorting.addEventListener("change", (event) => {
  currSorting = event.target.value;
  formSortHandler();
});
