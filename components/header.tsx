import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Sparkles } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">智能简历</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            功能特色
          </Link>
          <Link href="#templates" className="text-sm font-medium hover:text-primary transition-colors">
            模板库
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            价格
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            登录
          </Button>
          <Button size="sm" asChild>
            <Link href="/builder">
              <Sparkles className="mr-2 h-4 w-4" />
              开始创建
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
