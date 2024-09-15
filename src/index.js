import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { CompatRouter } from "react-router-dom-v5-compat"
import { PersistGate } from "redux-persist/integration/react"
import App from "./App"
import { persistor, store } from "./redux/store"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CompatRouter>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </CompatRouter>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
