# Resume Tailor - AI-Powered Web App

## ✨ Overview
A resume tailoring tool where users log in using email magic links. They enter job title and experience, and the AI (via n8n) rewrites/rescores their resume for the job. Results are saved and can be viewed later.

---

## 📦 Tech Stack
- **Next.js** (Frontend)
- **Supabase** (Auth - magic link)
- **MongoDB** (Data storage)
- **n8n + OpenAI** (AI resume improvement logic)
- **Vercel** (Deployment + CI/CD)

---

## ✅ Core Features
1. **Magic Link Login** (Supabase)
2. **User Form** (Job title, skills, experience)
3. **Resume Generation** (n8n + AI)
4. **View/Edit Saved Resumes** (MongoDB)
5. **CI/CD Deployment on Vercel**

---


## 🧠 AI Flow (via n8n)
1. User input sent to n8n webhook
2. OpenAI analyzes job title, rewrites experience
3. n8n sends back improved text
4. Next.js displays the tailored resume
5. MongoDB stores final version

---

## 🔐 Auth Flow
1. User visits page → sees "Login with Email"
2. Supabase sends magic link
3. User is authenticated → sees dashboard
