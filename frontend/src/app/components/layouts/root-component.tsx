import { useLoaderData, useOutlet } from "react-router-dom"
import { GlobalAppContextProvider } from "../../core/hooks/use-app-context";
import Header from "../shared/header";
import Footer from "../form/footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const RootComponent = () => {
    const outlet = useOutlet();
    const result = useLoaderData() as SupportedLanguages;
    return(<>
       <GlobalAppContextProvider languages = { result.languages } >
       <div className="afrochic flex flex-col gap-0 w-full">
        <Header />

        <div className="outlet w-full open-layout" id="open-layout-component">
          {outlet}
          <Footer />
        </div>
        <ToastContainer />
      </div>
        </GlobalAppContextProvider>
    </>)
}