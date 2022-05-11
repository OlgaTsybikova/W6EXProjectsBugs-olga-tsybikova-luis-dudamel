import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import Modal from "./components/Modal/Modal";
import Navigation from "./components/Navigation/Navigation";
import FormProjectPage from "./pages/FormProjectPage/FormProjectPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProjectDetailPage from "./pages/ProjectDetailPage/ProjectDetailPage";
import ProjectsListPage from "./pages/ProjectsListPage/ProjectsListPage";
import { loadProjectsThunk } from "./redux/thunks/projectsThunks";

function App() {
  const { loading, modal, theme } = useSelector(({ ui }) => ui);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProjectsThunk(dispatch));
  }, [dispatch]);

  return (
    <div className={`container ${theme}`}>
      <h1>Projects app</h1>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/projects" />} />
        <Route path="/projects" element={<ProjectsListPage />} />
        <Route path="/new-project" element={<FormProjectPage />} />
        <Route path="/projects/edit/:idProject" element={<FormProjectPage />} />
        <Route path="/projects/:idProject" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {loading && <Loading />}
      {modal && <Modal />}
    </div>
  );
}

export default App;
