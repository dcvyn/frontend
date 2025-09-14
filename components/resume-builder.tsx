"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Download,
  Sparkles,
  ArrowLeft,
  Plus,
  Trash2,
} from "lucide-react"
import Link from "next/link"

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    duration: string
    description: string
    optimizedDescription?: string[]
  }>
  education: Array<{
    id: string
    school: string
    degree: string
    duration: string
    description: string
  }>
  skills: string[]
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string[]
  }>
}

export function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("personal")
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
  })

  const [isOptimizing, setIsOptimizing] = useState(false)

  const optimizeText = async (text: string) => {
  setIsOptimizing(true)
  try {
    const response = await fetch('http://localhost:8000/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setIsOptimizing(false);
    return data.segments;
  } catch (error) {  
    setIsOptimizing(false);
    alert("AI优化失败，请检查后端服务是否运行");
    return [text];
  }
};

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: "",
      position: "",
      duration: "",
      description: "",
    }
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const handleOptimizeExperience = async (id: string) => {
    const experience = resumeData.experience.find((exp) => exp.id === id)
    if (!experience?.description) return

    const optimized = await optimizeText(experience.description)
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, optimizedDescription: optimized } : exp)),
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回首页
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-lg font-semibold">简历生成器</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              预览
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              导出PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 编辑区域 */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">个人信息</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">工作经历</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">教育背景</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span className="hidden sm:inline">技能</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">项目经历</span>
                </TabsTrigger>
              </TabsList>

              {/* 个人信息 */}
              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>个人基本信息</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">姓名</Label>
                        <Input
                          id="name"
                          placeholder="请输入您的姓名"
                          value={resumeData.personalInfo.name}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, name: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">邮箱</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={resumeData.personalInfo.email}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, email: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">电话</Label>
                        <Input
                          id="phone"
                          placeholder="请输入手机号码"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, phone: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">所在地</Label>
                        <Input
                          id="location"
                          placeholder="城市，省份"
                          value={resumeData.personalInfo.location}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, location: e.target.value },
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="summary">个人简介</Label>
                      <Textarea
                        id="summary"
                        placeholder="简要描述您的专业背景、核心技能和职业目标..."
                        className="min-h-[120px]"
                        value={resumeData.personalInfo.summary}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, summary: e.target.value },
                          }))
                        }
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-transparent"
                        disabled={!resumeData.personalInfo.summary || isOptimizing}
                        onClick={() => optimizeText(resumeData.personalInfo.summary)}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isOptimizing ? "优化中..." : "AI优化"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 工作经历 */}
              <TabsContent value="experience" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">工作经历</h3>
                  <Button onClick={addExperience} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    添加经历
                  </Button>
                </div>

                {resumeData.experience.map((exp, index) => (
                  <Card key={exp.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base">工作经历 {index + 1}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>公司名称</Label>
                          <Input
                            placeholder="公司名称"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>职位</Label>
                          <Input
                            placeholder="职位名称"
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>工作时间</Label>
                        <Input
                          placeholder="2023.01 - 2024.01"
                          value={exp.duration}
                          onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>工作描述</Label>
                        <Textarea
                          placeholder="详细描述您在该职位的工作内容、主要成就和贡献..."
                          className="min-h-[120px]"
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!exp.description || isOptimizing}
                          onClick={() => handleOptimizeExperience(exp.id)}
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          {isOptimizing ? "优化中..." : "AI智能分段"}
                        </Button>
                      </div>

                      {exp.optimizedDescription && (
                        <div className="space-y-2">
                          <Label>AI优化建议</Label>
                          <div className="space-y-2">
                            {exp.optimizedDescription.map((segment, idx) => (
                              <div key={idx} className="p-3 bg-muted rounded-md">
                                <Badge variant="secondary" className="mb-2">
                                  段落 {idx + 1}
                                </Badge>
                                <p className="text-sm">{segment}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {resumeData.experience.length === 0 && (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">还没有添加工作经历</p>
                      <Button onClick={addExperience}>
                        <Plus className="mr-2 h-4 w-4" />
                        添加第一份工作经历
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* 其他标签页内容可以类似地实现 */}
              <TabsContent value="education">
                <Card>
                  <CardContent className="py-12 text-center">
                    <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">教育背景功能开发中...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills">
                <Card>
                  <CardContent className="py-12 text-center">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">技能模块开发中...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects">
                <Card>
                  <CardContent className="py-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">项目经历功能开发中...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* 预览区域 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    简历预览
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    {/* 个人信息预览 */}
                    {resumeData.personalInfo.name && (
                      <div>
                        <h3 className="font-bold text-lg">{resumeData.personalInfo.name}</h3>
                        <div className="text-muted-foreground space-y-1">
                          {resumeData.personalInfo.email && <p>{resumeData.personalInfo.email}</p>}
                          {resumeData.personalInfo.phone && <p>{resumeData.personalInfo.phone}</p>}
                          {resumeData.personalInfo.location && <p>{resumeData.personalInfo.location}</p>}
                        </div>
                      </div>
                    )}

                    {resumeData.personalInfo.summary && (
                      <div>
                        <h4 className="font-semibold mb-2">个人简介</h4>
                        <p className="text-muted-foreground leading-relaxed">{resumeData.personalInfo.summary}</p>
                      </div>
                    )}

                    {/* 工作经历预览 */}
                    {resumeData.experience.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">工作经历</h4>
                        <div className="space-y-3">
                          {resumeData.experience.map((exp) => (
                            <div key={exp.id} className="border-l-2 border-accent pl-3">
                              <div className="font-medium">{exp.position}</div>
                              <div className="text-muted-foreground">{exp.company}</div>
                              <div className="text-xs text-muted-foreground">{exp.duration}</div>
                              {exp.description && (
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                  {exp.description.substring(0, 100)}...
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!resumeData.personalInfo.name && !resumeData.experience.length && (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">开始填写信息，预览将在这里显示</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
