
import './App.css'
import { SignInButton } from '@clerk/clerk-react'
import { SignedOut, SignedIn, SignOutButton } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'



function App() {
  return (
    <div>
      <h1>Welcome to Karcero</h1>

      <SignedOut>
      <SignInButton mode='modal'>
        <button>Go in Karcero</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
      <SignOutButton>
        <button>Escape Karcero</button>
        </SignOutButton>
      </SignedIn>


       <UserButton/>
    </div>
  )
}
export default App
