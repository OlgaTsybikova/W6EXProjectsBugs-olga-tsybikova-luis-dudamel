import axios from "axios";
import {
  addProjectActionCreator,
  loadProjectsActionCreator,
  removeProjectActionCreator,
} from "../features/projects/projectsSlice";
import {
  openModalActionCreator,
  setErrorOffActionCreator,
  setErrorOnActionCreator,
  setLoadingOffActionCreator,
  setLoadingOnActionCreator,
} from "../features/ui/uiSlice";

export const loadProjectsThunk = () => async (dispatch) => {
  dispatch(setLoadingOnActionCreator());
  try {
    const { data: projects } = await axios.get(process.env.REACT_APP_API_URL);

    dispatch(loadProjectsActionCreator(projects));
  } catch {
    dispatch(setErrorOnActionCreator());
    dispatch(openModalActionCreator("Tot malament"));
  } finally {
    dispatch(setLoadingOffActionCreator());
  }
};

export const deleteProjectThunk = (id) => async (dispatch) => {
  dispatch(setLoadingOnActionCreator());

  try {
    const { status } = await axios.delete(
      `${process.env.REACT_APP_API_URL}${id}`
    );

    if (status === 200) {
      dispatch(removeProjectActionCreator(id));
      dispatch(setErrorOffActionCreator());
      dispatch(openModalActionCreator("S'ha esborrat l'item del llistat"));
    }
  } catch {
    dispatch(setErrorOnActionCreator());
    dispatch(openModalActionCreator("Tot malament"));
  } finally {
    dispatch(setLoadingOffActionCreator());
  }
};

export const addProjectThunk = (newProject) => async (dispatch) => {
  dispatch(setLoadingOnActionCreator());

  try {
    const apiResponse = await axios.post(
      process.env.REACT_APP_API_URL,
      newProject
    );
    if (apiResponse.status === 201) {
      const newProjectId = apiResponse.data.id;
      const newProjectToDispatch = { ...newProject, id: newProjectId };
      dispatch(addProjectActionCreator(newProjectToDispatch));
      dispatch(setErrorOffActionCreator());
      dispatch(openModalActionCreator("S'ha agregat l'item del llistat"));
    }
  } catch {
    dispatch(setErrorOnActionCreator());
    dispatch(openModalActionCreator("Tot malament"));
  } finally {
    dispatch(setLoadingOffActionCreator());
  }
};
