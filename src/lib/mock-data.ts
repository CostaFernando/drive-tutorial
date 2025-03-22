export interface File {
  id: string;
  name: string;
  type: "file";
  url: string;
  parent: string;
}

export type Folder = {
  id: string;
  name: string;
  type: "folder";
  parent: string | null;
};

export const mockFolders: Folder[] = [
  { id: "1", name: "root", type: "folder", parent: null },
  { id: "2", name: "Documents", type: "folder", parent: "1" },
  { id: "3", name: "Images", type: "folder", parent: "1" },
  { id: "4", name: "Work", type: "folder", parent: "1" },
  { id: "5", name: "Presentations", type: "folder", parent: "4" },
];

export const mockFiles: File[] = [
  {
    id: "4",
    name: "Resume.pdf",
    type: "file",
    url: "/files/resume.pdf",
    parent: "0",
  },
  {
    id: "5",
    name: "Project Proposal.docx",
    type: "file",
    url: "/files/proposal.docx",
    parent: "1",
  },
  {
    id: "6",
    name: "Vacation.jpg",
    type: "file",
    url: "/files/vacation.jpg",
    parent: "2",
  },
  {
    id: "7",
    name: "Profile Picture.png",
    type: "file",
    url: "/files/profile.png",
    parent: "2",
  },
  {
    id: "9",
    name: "Q4 Report.pptx",
    type: "file",
    url: "/files/q4-report.pptx",
    parent: "8",
  },
  {
    id: "10",
    name: "Budget.xlsx",
    type: "file",
    url: "/files/budget.xlsx",
    parent: "3",
  },
];
