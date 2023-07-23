import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import styles from './styles/App.module.css'

import SignUpModal from './components/SignUpModal'
import NavBar from './components/NavBar'
import LoginModal from './components/LoginModal'
import { Container } from 'react-bootstrap'
import { User } from './models/user'
import * as NotesApi from './network/notes_api'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotesPage from './components/pages/NotesPage'
import PrivacyPage from './components/pages/PrivacyPage'
import NotFoundPage from './components/pages/NotFoundPage'

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser()
        setLoggedInUser(user)
      } catch (error) {
        console.log(error)
      }
    }
    fetchLoggedInUser()
  })
  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>
        {showSignUpModal && (
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user)
              setShowSignUpModal(false)
            }}
          />
        )}

        {showLoginModal && (
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user)
              setShowLoginModal(false)
            }}
          />
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
