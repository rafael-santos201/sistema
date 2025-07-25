# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copia tudo da pasta atual (backend)
COPY ./ ./

# Restaura dependências e compila
RUN dotnet restore
RUN dotnet publish -c Release -o out

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Expor a porta padrão ASP.NET
EXPOSE 80

# Comando para rodar a aplicação
ENTRYPOINT ["dotnet", "MeuSistemaApi.dll"]
