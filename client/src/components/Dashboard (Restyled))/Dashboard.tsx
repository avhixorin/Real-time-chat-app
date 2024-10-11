import { useState } from 'react'
import { Moon, Sun, Send, Mic, Paperclip, Bell, Settings, Search, UserPlus, Menu } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<{ id: number; name: string; username: string }[]>([])

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    // Simulating API call to search for users
    const mockResults = [
      { id: 1, name: "John Doe", username: "johnd" },
      { id: 2, name: "Jane Smith", username: "janes" },
      { id: 3, name: "Bob Johnson", username: "bobj" },
    ].filter(user => 
      user.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
      user.username.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setSearchResults(mockResults)
  }

  const sendFriendRequest = (userId: number) => {
    console.log(`Friend request sent to user ${userId}`)
    // Here you would typically send a request to your backend API
  }

  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Top Bar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm z-10 py-2 px-4 sm:py-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Chats</h2>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">User {i}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Last message...</p>
                    </div>
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">ChatApp</h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                <Search className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Find New Friends</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full"
                />
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {searchResults.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                      </div>
                      <Button onClick={() => sendFriendRequest(user.id)} size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
            <Bell size={20} />
          </button>
          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors hidden sm:block">
            <Settings size={20} />
          </button>
          <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Side Menu / Contacts List */}
        <aside className={`w-64 bg-gray-100 dark:bg-gray-900 transform transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} hidden md:block`}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Chats</h2>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-3 mb-4 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">User {i}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last message...</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Chat Window */}
        <main className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-950 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] sm:max-w-md ${i % 2 === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'} rounded-lg p-3 shadow-md`}>
                  <p>This is a sample message. It can be long or short.</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs opacity-75">12:34 PM</span>
                    {i % 2 === 0 && <span className="text-xs">✓✓</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Bar */}
          <div className="bg-white dark:bg-gray-800 p-2 sm:p-4 shadow-lg flex items-center">
            <Input type="text" placeholder="Type a message..." className="flex-1 mr-2" />
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
              <Paperclip size={20} />
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
              <Mic size={20} />
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
              <Send size={20} />
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
