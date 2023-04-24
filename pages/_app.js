import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import Layout from "@/components/Layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "@/feature/auth-context";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Layout>
      </Provider>
    </AuthContextProvider>
  );
}
