import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { setCredentials } from './actions/authActions'
import App from './App.tsx'
import './index.css'
import { store } from './store'
import { readStoredAuth } from './utils/authStorage'

const saved = readStoredAuth()
if (saved) {
  store.dispatch(setCredentials(saved))
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-center"
          richColors
          closeButton
          duration={4200}
          toastOptions={{
            classNames: {
              toast:
                'font-["Lato",system-ui,sans-serif] border border-stone-200/90 bg-white/95 backdrop-blur-sm shadow-lg text-stone-800',
              title: 'font-semibold text-stone-900',
              description: 'text-stone-600 text-sm',
              closeButton: 'text-stone-500 hover:bg-stone-100',
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
