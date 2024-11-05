import Image from 'next/image'

type ModalProps = {
  title: string
  showRules: boolean
  closeRules: () => void
}

export default function Modal({ title, showRules, closeRules }: ModalProps) {
  return (
    <>
      <div
        className={`${
          showRules ? 'opacity-100 visible' : 'opacity-0 invisible'
        } fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg w-[300px]  sm:w-[400px] h-[415px] z-20 transition-all duration-300`}
      >
        <div className='flex items-center justify-between mb-12'>
          <h2 className='text-rules-title font-bold text-3xl uppercase'>
            {title}
          </h2>

          <Image
            src='/close.svg'
            width={24}
            height={24}
            alt='Close Icon'
            onClick={closeRules}
            className='cursor-pointer'
          />
        </div>

        <Image
          src='/rules.svg'
          alt='Rules'
          width={305}
          height={271}
          className='mx-auto'
        />
      </div>

      <div
        className={`${
          showRules ? 'opacity-100 visible' : 'opacity-0 invisible'
        } absolute top-0 left-0 w-full h-full bg-black/50 pointer-events-none z-10 transition-all `}
      ></div>
    </>
  )
}
