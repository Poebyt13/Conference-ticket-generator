
import CustomForm from './components/CustomForm'
import logo from './assets/images/logo-full.svg'

function App() {

  return (
    <>
      <section>
        <img src={logo} alt="logo" />
      </section>
      <section className='text-center'>
        <h1 className='text-4xl font-bold'>Your Journey to Coding Conf <br/>2025 Starts Here!</h1>
        <p className='text-sm mt-3 text-neutral-400 tracking-[.09rem]'>Secure your spot at next year's biggest coding conference.</p>
      </section>
      <CustomForm />
    </>
  )
}

export default App