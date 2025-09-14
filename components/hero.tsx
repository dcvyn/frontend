import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, FileText } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-accent/20 transition-all">
              AI驱动的智能文本分析 <ArrowRight className="ml-1 inline h-4 w-4" />
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
            用AI打造完美
            <span className="text-accent">简历</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty max-w-2xl mx-auto">
            结合先进的语义分析技术，智能优化您的简历内容结构，让每一份简历都能精准展现您的专业能力和职业亮点。
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/builder">
                <Sparkles className="mr-2 h-5 w-5" />
                免费开始创建
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <FileText className="mr-2 h-5 w-5" />
              查看示例
            </Button>
          </div>

          <div className="mt-16 flow-root sm:mt-24">
            <div className="relative rounded-xl bg-card/50 p-2 ring-1 ring-border lg:rounded-2xl lg:p-4">
              <img
                src="/modern-resume-builder-interface-with-ai-features.jpg"
                alt="简历生成器界面预览"
                className="rounded-md shadow-2xl ring-1 ring-border"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
