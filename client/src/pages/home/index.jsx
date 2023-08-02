import { useNavigate } from "react-router-dom"

import { Navbar } from "../../components/navbar"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-12">
      <Navbar />
      <main className="col-span-full px-24 py-12 space-y-12">
        <section className="flex justify-end">
          <button
            className='rounded-md py-3 px-4 border text-[1.4rem]'
            onClick={() => navigate('/dashboard')}>
            Go to the dashboard
          </button>
        </section>
        <h1 className="text-2xl font-bold"> Welcome to the home page </h1>
      </main>
    </div>
  )
}

export default Home