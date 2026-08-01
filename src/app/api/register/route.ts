
import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import type { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Caminho do arquivo
    const filePath = join(process.cwd(), "src/mocks/users.json");
    
    // Ler arquivo existente
    const fileContent = await readFile(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);
    
    // Criar novo usuário
    const newUser = {
      login: data.email.split("@")[0], // Usar email como login
      password: data.password,
      user: {
        firstName: data.name.split(" ")[0],
        fullName: data.name,
      },
      account: {
        type: "Conta Corrente",
        balance: 0,
      },
      today: new Date().toLocaleDateString("pt-BR", { 
        weekday: "long", 
        year: "numeric", 
        month: "2-digit", 
        day: "2-digit" 
      }),
      transactions: [],
    };
    
    jsonData.users.push(newUser);
    
    await writeFile(filePath, JSON.stringify(jsonData, null, 2));
    
    return Response.json(
      { 
        success: true, 
        message: "Usuário cadastrado com sucesso!",
        user: newUser 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar:", error);
    return Response.json(
      { success: false, message: "Erro ao cadastrar usuário" },
      { status: 500 }
    );
  }
}