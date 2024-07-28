import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './App.tsx'
import './index.css'
import registerUIComponentsLicence from './app/core/licences/ui-components-licence.ts';
import FxErrorBoundary from './app/core/error-handling/error-boundary.tsx';
import { Provider } from 'react-redux';
import AppPreloader from './app/components/shared/app-preloader.tsx';
import { RouterProvider } from 'react-router-dom';
import { store } from './app/store-management/store-creation.ts';

registerUIComponentsLicence();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <FxErrorBoundary>
        <Suspense fallback={<AppPreloader/>}>
            <RouterProvider router={router}/>
        </Suspense>
      </FxErrorBoundary>
    </Provider>,
)
