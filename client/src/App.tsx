import Layout from "./pages/Layout";
import "./index.css";
import SongList from "./components/SongList";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Stats from "./components/Stats";
import SongForm from "./components/SongForm";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SongList />} />
            <Route path="new" element={<SongForm />} />
            <Route path="update/:id" element={<SongForm />} />
            <Route path="stats" element={<Stats />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
