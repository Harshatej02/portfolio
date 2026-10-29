<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Visitor Q&A chat streams via the `/api/chat` server route and answers only from `src/lib/portfolio.ts`; visitor chats are stored by an anonymous browser ID and accessed only server-side, because visitors have no accounts.

- Keep portfolio colors and photographic overlays in global semantic CSS tokens; use the existing Button component for primary controls so reference-style changes remain consistent.
