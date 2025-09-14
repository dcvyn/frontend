import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, FileText, Zap, Target, Users, Download } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "智能文本分析",
    description: "使用先进的NLP技术，自动分析和优化您的简历内容结构，确保信息层次清晰。",
  },
  {
    icon: Target,
    title: "语义聚类分段",
    description: "基于语义相似性智能分组相关内容，让您的经历和技能更有条理地展现。",
  },
  {
    icon: Zap,
    title: "实时优化建议",
    description: "在您输入内容时提供实时的改进建议，帮助您写出更具吸引力的简历。",
  },
  {
    icon: FileText,
    title: "专业模板库",
    description: "提供多种行业专业模板，适配不同职位需求，让您的简历脱颖而出。",
  },
  {
    icon: Users,
    title: "多语言支持",
    description: "支持中英文简历创建，满足国内外求职需求，拓展您的职业机会。",
  },
  {
    icon: Download,
    title: "多格式导出",
    description: "支持PDF、Word等多种格式导出，确保在任何场合都能完美展示。",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            强大功能，助您成功
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            集成最新AI技术，为您提供专业、智能的简历创建体验
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
