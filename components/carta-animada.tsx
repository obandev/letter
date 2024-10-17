"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function Letter() {
  const [isOpen, setIsOpen] = useState(false)
  const [letterContent, setLetterContent] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!letterContent.trim()) return

    setIsSending(true)

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{ message: letterContent }])

      if (error) throw error

      console.log('Mensaje guardado:', data)
      setLetterContent("")
      setIsOpen(false)
    } catch (error) {
      console.error('Error al guardar el mensaje:', error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center lg:justify-center min-h-screen bg-white p-4 relative">
        <h1 className="text-3xl font-bold mb-8">
          CARTA PARA{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help">PABLO</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>el programador mas guapo del mundo :p</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>{" "}
        </h1>
        <div
          className="cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 relative mb-4"
          onClick={handleClick}
        >
          <svg width="200" height="160" viewBox="0 0 200 160" className="transition-all duration-500 ease-in-out">
            <path
              d="M10,50 L190,50 L190,150 L10,150 Z"
              fill={isOpen ? "white" : "none"}
              stroke="black"
              strokeWidth="2"
              className="transition-all duration-500 ease-in-out"
            />
            <path
              d={isOpen ? "M10,50 L100,10 L190,50" : "M10,50 L100,100 L190,50"}
              fill={isOpen ? "white" : "none"}
              stroke="black"
              strokeWidth="2"
              className="transition-all duration-500 ease-in-out"
            />
            <path
              d={isOpen ? "M10,150 L100,110 L190,150" : "M10,150 L100,100 L190,150"}
              fill={isOpen ? "white" : "none"}
              stroke="black"
              strokeWidth="2"
              className="transition-all duration-500 ease-in-out"
            />
            <path
              d={isOpen ? "M10,50 L60,80 L10,150" : "M10,50 L10,150"}
              fill={isOpen ? "white" : "none"}
              stroke="black"
              strokeWidth="2"
              className="transition-all duration-500 ease-in-out"
            />
            <path
              d={isOpen ? "M190,50 L140,80 L190,150" : "M190,50 L190,150"}
              fill={isOpen ? "white" : "none"}
              stroke="black"
              strokeWidth="2"
              className="transition-all duration-500 ease-in-out"
            />
            <circle 
              cx="100" 
              cy={isOpen ? 110 : 100} 
              r="8" 
              fill="red"
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
          {isOpen && (
            <svg
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              width="40"
              height="40"
              viewBox="0 0 40 40"
            >
              <path
                d="M20,10 C18,5 10,5 10,13 C10,19 20,25 20,25 C20,25 30,19 30,13 C30,5 22,5 20,10 Z"
                fill="red"
                className="animate-heart"
              />
            </svg>
          )}
        </div>
        {isOpen && (
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div className="space-y-2">
              <Input
                id="letter-content"
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
                className="w-full p-2 border-2 border-red-500 rounded-md focus:outline-none focus:ring-0 focus:border-red-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-red-500 hover:bg-red-600 text-white"
              disabled={isSending}
            >
              {isSending ? '...' : 'Enviar'}
            </Button>
          </form>
        )}
        {!isOpen && <div className="h-[88px]" />}
        <div className="absolute bottom-0 left-2 w-40 h-40">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full h-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Subject-dp5tZewOd3zkhZQCT0jOYkV0LhJYPk.png"
                    alt="Cute pink octopus plush toy"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {/* <p>cuanto tiempo es para siempre?</p> */}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="absolute bottom-4 right-2 w-40 h-40">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* <div className="w-full h-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/195982464_2163681030450083_2372404563656666235_n-removebg-preview-AHxMnqm4PSX782bloW5wrTrLeswwhA.png"
                    alt="Looney Tunes LEGO figures - Daffy Duck and Bugs Bunny"
                    layout="fill"
                    objectFit="contain"
                  />
                </div> */}
              </TooltipTrigger>
              <TooltipContent>
                <p>a veces solo un segundo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  )
}
