import WordRow from './wordRow';

export default function App() {

  return (

      <div className="mx-auto w-96">
        <header className='border-b border-gray-500 pb-2 mb-2'>
          <h1 className="text-4xl text-center"> Wordle </h1>
        </header>

        <main className='grid grid-rows-6 gap-4'>
          <WordRow letters="he" />
          <WordRow letters="hell"/>
          <WordRow letters="hello"/>
          <WordRow letters="solar"/>
          <WordRow letters="penny"/>
          <WordRow letters="stare"/>
       

        </main>
      </div>
  )
}


