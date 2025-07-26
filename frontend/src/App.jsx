import { useState } from 'react'
import './App.css'
import Login from './Login.jsx' 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PainelAdm from "./PainelDeAdm.jsx";

function App() {

return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/painel-adm"
          element={
            <PrivateRouteAdm>
              <PainelDeAdm />
            </PrivateRouteAdm>
          }
        />

        <Route path="/painel-funcionario" element={<PainelFuncionario />} />
      </Routes>
    </BrowserRouter>
  );}

export default App
