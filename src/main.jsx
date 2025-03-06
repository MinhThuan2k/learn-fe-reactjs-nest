import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes/router'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.element />}>
          {route.children &&
            route.children.map((child, childIndex) => (
              <Route
                key={childIndex}
                path={child.path}
                element={<child.element />}
                index={child.index}
              />
            ))}
        </Route>
      ))}
    </Routes>
  </BrowserRouter>
  // </StrictMode>
)
