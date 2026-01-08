const formData = [
  {
    id: 1,
    title: "My Most Recent Form",
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
    viewers: [
      "anybody"
    ],
    content: `Form Markdown`
  },
  {
    id: 2,
    title: "An Earlier Form",
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
      }
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
      }
    ],
    content: `All form data in Markdown format`
  },
];
