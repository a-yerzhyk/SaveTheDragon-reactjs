import Frame from '@/components/Frame'

export default function Home() {
  return (
    <main className="game-background flex flex-col items-center justify-center">
      <div className='air air1'></div>
      <div className='air air2'></div>
      <div className='air air3'></div>
      <div className='air air4'></div>
      <Frame />
    </main>
  )
}
