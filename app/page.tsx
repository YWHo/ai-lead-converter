import { UserButton } from "@clerk/nextjs";
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div>
      <Button>Click Me</Button>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
