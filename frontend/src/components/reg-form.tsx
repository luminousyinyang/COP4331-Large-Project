import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Eye } from 'react-feather';
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function RegForm({ className, ...props }: React.ComponentProps<"div">) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [error, setError]       = useState('')
  const navigate = useNavigate()


  const handleSignUp = async () => {
    try {
      const resp = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, firstname, lastname })
      })

      const data = await resp.json()
      // 201 is response for successful user creation
      if (resp.status !== 201) {
        throw new Error(data.message)
      }

      // logged in
      navigate('/loggedIn')

    } catch (err) {
      // setting error message for div in the form
      setError(err instanceof Error ? err.message : 'Error Signing Up')
    }
  }



  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
      <CardHeader className="text-center">
          <CardTitle className="text-xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-3">
                  <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      onChange={(e) => setFirstname(e.target.value)}
                      value={firstname}
                    required/>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      onChange={(e) => setLastname(e.target.value)}
                      value={lastname}
                      required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="relative">
                    <Input 
                    id="password" 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required />
                    <Eye size={22} className="absolute top-2 right-4"/>
                  </div>
                </div>

                {error && (
                  <div className="text-red-600 text-center">
                    {error}
                  </div>
                )}

                <Button type="button" className="w-full" onClick={handleSignUp}>
                  Register
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="./login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}