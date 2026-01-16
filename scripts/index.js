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

const displayAllFormsInGrid = (formData) => {
  viewToggle.innerHTML = `<i class="fa-solid fa-list"></i>`;
  allFormsContainer.innerHTML = "";
  const allForms = document.createElement("div");
  allForms.classList.add("row");

  formData.map((currFormData) => {
    const lastOpenedAt = currFormData.lastOpenedAt;
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
    const lastOpenedAt = currFormData.lastOpenedAt;
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

viewToggle.addEventListener("click", () => {
  currView === "grid" ? "list" : "grid";

  switch (currView) {
    case "grid":
      currView = "list";
      break;
    default:
      currView = "grid";
      break;
  }

  currView === "grid"
    ? displayAllFormsInGrid(formData)
    : displayAllFormsInList(formData);
});

currView === "grid"
  ? displayAllFormsInGrid(formData)
  : displayAllFormsInList(formData);
