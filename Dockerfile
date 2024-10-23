FROM node:18-alpine

WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependências
RUN npm install

# Instalar ts-node globalmente
RUN npm install -g ts-node -g nodemon

# Copiar código fonte
COPY . .

# Compilar TypeScript
RUN npm run build --no-cache

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
