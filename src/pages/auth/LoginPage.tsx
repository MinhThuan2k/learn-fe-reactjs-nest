import RandomDecorations from '@/components/ui/RandomDecorations'
import { LoginForm } from '@/pages/auth/login-form'
import { motion } from 'framer-motion'

export function LoginPage() {
  return (
    <div className='relative flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] p-6 md:p-10 overflow-hidden'>
      <RandomDecorations />
      <div className='z-10 w-full max-w-sm md:max-w-3xl'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <LoginForm />
        </motion.div>
      </div>
    </div>
  )
}
