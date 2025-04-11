import { queryClient } from '@/core/lib/queryClient'
import { router } from '@/routes/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true
        }}
      />
      <ToastContainer position='top-right' autoClose={3000} />
    </QueryClientProvider>
  )
}

export default App
