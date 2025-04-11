import { motion } from 'framer-motion'

export const OverlayLoading = () => {
  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className='relative w-20 h-20'
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 2,
          ease: 'easeInOut'
        }}
      >
        <div className='absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 opacity-40 blur-2xl animate-pulse' />
        <div className='relative w-full h-full rounded-full border-t-4 border-blue-600 border-solid border-opacity-80 animate-spin bg-white shadow-lg' />
        <div className='absolute inset-[25%] bg-blue-500 rounded-full shadow-inner animate-pulse' />
      </motion.div>
    </motion.div>
  )
}
