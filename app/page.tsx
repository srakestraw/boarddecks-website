import Header from '@/components/Header'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-darkNavy mb-4">
            Board Decks
          </h1>
          <p className="text-lg text-gray-600">
            Professional board deck templates and tools
          </p>
        </div>
      </main>
    </div>
  )
} 