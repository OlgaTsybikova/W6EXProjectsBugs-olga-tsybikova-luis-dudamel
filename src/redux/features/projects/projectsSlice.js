import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    loadProjects: (projects, action) => [...action.payload],
    addProject: (projects, action) => [...projects, action.payload],
    updateProject: (projects, action) =>
      projects.map((project) =>
        project.id === action.payload.id
          ? { ...action.payload }
          : { ...project }
      ),
    removeProject: (projects, action) =>
      projects.filter((project) => project.id !== action.payload),
  },
});

export const {
  loadProjects: loadProjectsActionCreator,
  addProject: addProjectActionCreator,
  updateProject: updateProjectActionCreator,
  removeProject: removeProjectActionCreator,
} = projectsSlice.actions;

export default projectsSlice.reducer;
