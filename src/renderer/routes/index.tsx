import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Home, Setting } from '../pages'

const Teste = () => {
  return <Link to="/">aaa</Link>
}

export const RoutesApp = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Teste />} path="/oi" />
      <Route element={<Setting />} path="/setting" />
    </Routes>
  )
}
