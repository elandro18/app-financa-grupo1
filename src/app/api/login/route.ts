// src/app/api/login/route.ts
import { readFile } from "fs/promises";
import { join } from "path";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
      console.log("Recebendo requisição de login...");


      const { login, password } = await request.json();
    
      const filePath = join(process.cwd(), "src/mocks/users.json");
      const fileContent = await readFile(filePath, "utf-8");
      const jsonData = JSON.parse(fileContent);
      
      // Procurar usuário com login e senha corretos
      const user = jsonData.users.find(
         (u: any) => u.login === login && u.password === password
      );
      console.log("user:", user);
      if (user) {
         return Response.json(
         { 
            success: true, 
            message: "Login realizado com sucesso!",
            user: {
               login: user.login,
               fullName: user.user.fullName,
               firstName: user.user.firstName,
            }
         },
         { status: 200 }
         );
      } else {
         console.log(`Tentativa de login falhou para login: ${login}`);
         return Response.json(
         { 
            success: false, 
            message: "Usuário ou senha incorretos" 
         },
         { status: 401 }
         );
      }
   } catch (error) {
      console.error("Erro:", error);
      return Response.json(
         { success: false, message: "Erro ao fazer login" },
         { status: 500 }
      );
  }
}