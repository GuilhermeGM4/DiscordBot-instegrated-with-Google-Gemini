# DiscordBot instegrated with Google Gemini
 
Este projeto visa fazer um bot do discord integrado com a API do AI Studio para fazer algumas automações e criar um novo nível de experiência com bots do discord.

## Instalação

Use os seguintes comandos para instalar o repositorio e suas dependências:

```bash
  git clone https://github.com/GuilhermeGM4/DiscordBot-instegrated-with-Google-Gemini.git
  
  cd DiscordBot-instegrated-with-Google-Gemini.git
  
  npm install
```

## Rodar o projeto

Primeiramente você irá precisar criar um bot na página de desenvolvedor do Discord, para informações detalhadas sobre como fazer isso, acesse o link a seguir:

https://discordjs.guide/preparations/setting-up-a-bot-application.html

Para rodar o projeto use o seguinte comando em um terminal:

```bash
  npm run watch
```

Isso fará que todos os arquivos em ./build estejão corretos.

Crie um arquivo .env com as seguintes linhas:
```env
  DISCORD_TOKEN = "SUA_CHAVE_DA_API_DISCORD"
  GEMINI_TOKEN = "SUA_CHAVE_DA_API_AISTUDIO"
```
Então crie o arquivo env.d.ts da seguinte maneira:
```TypeScript
  declare namespace NodeJS{
    interface ProcessEnv{
        DISCORD_TOKEN: string;
        GEMINI_TOKEN: string;
    }
  }
```

Depois de ter criado os arquivos, abra um novo terminal e rode o seguinte comando que irá iniciar o bot:

```bash
  npm run dev
```

## Usos do Bot

Este bot está sempre observando as mensagem de todos os canais que ele tem acesso, portanto se ele julgar alguma frase ser ofensiva ele irá avisar a pessoa.

Também é possivel fazer comandos com ele, o prefixo de todos os comando é "!c", para ter a lista de comandos utilize "!c help".