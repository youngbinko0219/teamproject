import AppRouter from "./components/routes/Router";
import ToastProvider from "./provider/toastContainer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  );
}

export default App;
