import { Spinner } from '@/shared/ui/spinner'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner className="size-8" />
    </div>
  )
}
