import { createFileRoute } from '@tanstack/react-router'
import { ThemeModeToggle } from '@/shared/components/ThemeModeToggle'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <ThemeModeToggle />
      <p>hello world</p>
    </div>
  )
}
