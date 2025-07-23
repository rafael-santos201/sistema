# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copia apenas o arquivo .csproj para restaurar dependências
COPY sistema/backend/MeuSistemaApi.csproj ./backend/

RUN dotnet restore ./backend/MeuSistemaApi.csproj

# Copia todo o código da pasta backend
COPY sistema/backend ./backend

WORKDIR /src/backend

# Compila e publica o projeto
RUN dotnet publish -c Release -o /app/out

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copia os arquivos publicados da etapa de build
COPY --from=build /app/out .

# Expõe a porta padrão
EXPOSE 80

# Comando para iniciar a aplicação
ENTRYPOINT ["dotnet", "MeuSistemaApi.dll"]
