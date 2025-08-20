import { store } from '@/store/store'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import ScrollTop from './components/ScrollTop'
import GlobalSnackbar from './components/third-party/GlobaSnackbar/GlobalSnackbar'
import router from './routes'
import ThemeCustomization from './themes'

function App() {
  // useScrollToTop()
  return (
    <Provider store={store}>
      <ThemeCustomization>
        <GlobalSnackbar />
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </ThemeCustomization>
    </Provider>
  )
}

// function useScrollToTop() {
//   const pathname = usePathname()

//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [pathname])

//   return null
// }

export default App
