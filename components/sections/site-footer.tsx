import type { LangContent } from "@/lib/content"
import { Sparkles } from "lucide-react"

export function SiteFooter({ content }: { content: LangContent }) {
  return (
    <footer className="border-t border-border bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles className="h-3 w-3" />
            </div>
            AI Visibility
          </div>
          <p className="max-w-lg text-xs leading-relaxed text-muted-foreground">
            {content.footer.disclaimer}
          </p>
          <div className="h-px w-16 bg-border" />
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} AI Visibility. {content.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
