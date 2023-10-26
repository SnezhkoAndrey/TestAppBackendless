import React, { Suspense } from "react";
import { Route } from "react-router";
import { Routes, NavLink, Navigate } from "react-router-dom";
import "./App.css";

import tabs from "./tabs.json";

function App() {
  return (
    <div className="App">
      <div className="header">
        {tabs.map((tb) => (
          <NavLink to={`/${tb.id}`}>{tb.title}</NavLink>
        ))}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {tabs.map((tb) => {
            const DummyTable = React.lazy(() => import(`./${tb.path}`));
            return <Route path={`/${tb.id}`} element={<DummyTable />} />;
          })}

          <Route path="*" element={<Navigate to={`/${tabs[0].id}`} />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
