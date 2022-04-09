## Sobre

[Imagens demonstração](#Imagens)

BOT em desenvolvimento, toda ajuda é bem vinda.

Quando for executado pela primeira vez, será criado uma pasta nos seus documentos com nome de "bot-bombcrypto", nela terá o banco de dados e as imagens que o bot usa para fazer o reconhecimento, você pode alterar essas imagens caso necessário

Hoje o bot esta colocando todos para trabalhar, porque ainda não conseguir resolver problema de fazer scroll na lista dos heroes

## se alguem que entende de electronJS quiser ajudar entra em contato telegram @lucasvieceli

## Tecnologias utilizadas

-   Electron
-   React
-   Typescript
-   TypeORM
-   @nut-tree/nut-js
-   OpenCV.js
-   SQLlite

## Funcionalidades

-   Multi idioma
-   Multi account
-   Registra os bcoins do baú
-   Relatórios
-   Valor da moeda em tempo real

## Instalação em desenvolvimento

```
npm i
npm start
```

## BUILD

Windows ainda não foi testado

```
    npm run build && npx electron-builder --mac
    npm run build && npx electron-builder --linux --x64
    npm run build && npx electron-builder --windows
```

## O que falta

-   [x] Melhorar reconhecimento das imagens
-   [ ] Arrumar CSS componente terminal
-   [x] Colocar multi accoount, desenvolver uma lib para mac,linux e windows
-   [ ] Adicionar multi threads
-   [ ] Adicionar self update, para quando for lançado uma versão, todos receberem atualização
-   [x] Adicionar abortcontroller nas ações
-   [x] Adicionar funcionalidade de excluir uma conta cadastrada
-   [ ] Adicionar ação de colocar um herói para trabalhar quando for resetado o mapa
-   [ ] Adicionar traduções para EN
-   [ ] Corrigir scroll na listagem de heroes
-   [ ] Atualizar electronjs

## Imagens

![alt text](https://github.com/lucasvieceli/bot-electron/blob/main/7.gif?raw=true)
![alt text](https://github.com/lucasvieceli/bot-electron/blob/main/1.png?raw=true)
![alt text](https://github.com/lucasvieceli/bot-electron/blob/main/2.png?raw=true)
![alt text](https://github.com/lucasvieceli/bot-electron/blob/main/3.png?raw=true)
![alt text](https://github.com/lucasvieceli/bot-electron/blob/main/4.png?raw=true)
![alt text](https://github.com/lucasvieceli/bot-electron/blob/main/5.png?raw=true)
![alt text](https://github.com/lucasvieceli/bot-electron/blob/main/6.png?raw=true)
