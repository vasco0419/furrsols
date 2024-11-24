import './styles/normalize.css'
import './styles/fonts.css'
import './styles/utils.css'
import './styles/app.css'

import { useMemo } from "react"
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route
} from "react-router-dom"

import { Provider } from 'react-redux'
import { store } from './redux/store'
import { getPhantomWallet, getSolflareWallet } from '@solana/wallet-adapter-wallets'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

import ThemeProvider from "@material-ui/styles/ThemeProvider"

import CONFIG from './configs'

import MuiTheme from "./components/theme"
import DashboardPage from "./pages/Frontend/DashboardPage"
import MartPage from "./pages/Frontend/MartPage"
import InventoryPage from "./pages/Frontend/InventoryPage"

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

require('@solana/wallet-adapter-react-ui/styles.css')

const { CLUSTER_API } = CONFIG

const App = () => {
  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet()],
    []
  )
  return (
    <Provider store={store}>
      <ThemeProvider theme={MuiTheme}>
        <ConnectionProvider endpoint={CLUSTER_API}>
          <WalletProvider wallets={wallets} autoConnect={true}>
            <WalletModalProvider>
              <BrowserRouter>
                <ToastContainer />
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/mart" element={<MartPage />} />
                  <Route path="/inventory" element={<InventoryPage />} />
                  <Route path='/*' element={<Navigate to="/dashboard" />} />
                </Routes>
              </BrowserRouter>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ThemeProvider>
    </Provider>
  )
}
export default App
