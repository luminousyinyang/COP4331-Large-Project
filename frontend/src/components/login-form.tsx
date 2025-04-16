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
import { Eye, User } from 'react-feather';
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const navigate = useNavigate()


  const handleLogin = async () => {
    try {
      const resp = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await resp.json()
      if (resp.status !== 200) {
        throw new Error(data.message)
      }

      // logged in
      navigate('/loggedIn')

    } catch (err) {
      // setting error message for div in the form
      setError(err instanceof Error ? err.message : 'Login Failed')
    }
  }




  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>

        <Card className="pt-0 h-[600px] w-[500px]">
            <div className="text-4xl bg-[var(--bg-salmon)] h-[240px] flex justify-center items-center rounded-t-xl"> 
                <p className=""> Welcome </p>
            </div>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid gap-6 flex justify-center">
                        <div className="flex flex-col gap-4 w-[330px]">
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
                                <div className="flex items-center relative">
                                    <Label htmlFor="password">Password</Label>
                                    <User size={22} className="absolute bottom-11 right-4" />
                                    
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
                        </div>

                        {error && (
                          <div className="text-red-600 text-center">
                            {error}
                          </div>
                        )}

                        <Button type="button" className="w-[155px] justify-self-center" onClick={handleLogin}>
                            Login
                        </Button>
                        <div className="text-center text-sm">
                            Don't have an account?{" "}
                            <a href="./signup" className="underline underline-offset-4">
                            Sign up
                            </a>
                        </div>
                    </div>
                </form>
            </CardContent>
      </Card>
    </div>
  )
}